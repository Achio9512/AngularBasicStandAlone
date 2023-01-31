import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, map, of, retry, tap, throwError } from 'rxjs';

/*Models*/
import { Donut } from '../models/donut.model';

//Becuase the injectable is on root you can use it without any dependencies on the admin module.
@Injectable()
export class DonutService {
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) {}
  // 'of' is used to convert the variable type into a observable.
  readAll() {
    if (this.donuts.length) {
      return of(this.donuts);
    }
    // we have the option to pass the properties directly to the object or use the append or add function.
    /*    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Token': '123456'
    });*/

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }).append('Api-Token', '123456');

    const options = {
      headers,
    };
    //Tap is allowing us to handle operations after the http request.

    return this.http.get<Donut[]>(`/api/donuts`, options).pipe(
      tap((donuts) => {
        this.donuts = donuts;
      }),
      //retryWhen is deprecated.
      retry({ count: 2, delay: 5000 }),
      catchError(this.handleError)
    );
  }

  readById(id: string | null) {
    return this.readAll().pipe(
      map((donuts) => {
        const donut = donuts.find((donut: Donut) => donut.id === id);
        if (donut) {
          return donut;
        }
        return { name: '', icon: '', price: 0, description: '' };
      })
    );
  }
  create(payload: Donut) {
    return this.http.post<Donut>(`/api/donuts`, payload).pipe(
      tap((donut) => {
        //We are doing this because we need to update the state of the donut.
        this.donuts = [...this.donuts, donut];
      }),
      catchError(this.handleError)
    );
  }

  update(payload: Donut) {
    return this.http.put<Donut>(`/api/donuts/${payload.id}`, payload).pipe(
      tap((donut) => {
        this.donuts = this.donuts.map((item: Donut) => {
          if (item.id === donut.id) {
            return donut;
          }
          return item;
        });
      }),
      catchError(this.handleError)
    );
  }

  delete(payload: Donut) {
    return this.http.delete<Donut>(`/api/donuts/${payload.id}`).pipe(
      tap(() => {
        this.donuts = this.donuts.filter(
          (donut: Donut) => donut.id !== payload.id
        );
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.warn('Client error:', err.message);
    } else {
      console.warn('Server error:', err.status);
    }
    return throwError(() => new Error(err.message));
  }
}
