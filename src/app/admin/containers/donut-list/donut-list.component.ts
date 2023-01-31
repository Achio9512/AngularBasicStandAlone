import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DonutCardComponent } from '../../components/donut-card/donut-card.component';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

@Component({
  standalone: true,
  imports: [RouterModule, DonutCardComponent, NgIf, NgForOf],
  providers: [DonutService],
  selector: 'app-donut-list',
  template: `
    <div>
      <div class="donut-list-actions">
        <a routerLink="new" class="btn btn--green">
          New Donut
          <img src="/assets/img/icon/plus.svg" />
        </a>
      </div>
      <ng-container *ngIf="donuts?.length; else nothing">
        <donut-card
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        ></donut-card>
      </ng-container>

      <ng-template #nothing>
        <p>no donuts here...</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
    .donut-list {
      &-actions{
        margin-bottom:10px;
      }
    }
    `
  ],
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];

  constructor(private donutService: DonutService) {}
  //Initialitation and fetching services.
  //This is how works the dependency injection.
  ngOnInit(): void {
    this.donutService
      .readAll()
      .subscribe((donuts: Donut[]) => (this.donuts = donuts));
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}

/*
      <ng-template ngFor [ngForOf]="donuts" let-donut let-i="index">
        <donut-card [donut]="donut"></donut-card>
      </ng-template>

<div *ngFor="let donut of donuts; index as i; odd as o; even as e" [style.color]="e ? 'red':'blue'">
        {{i + 1}}
        {{o}}
        {{e}}
      </div>*/
