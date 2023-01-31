import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DonutFormComponent } from '../../components/donut-form/donut-form.component';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

@Component({
  standalone: true,
  imports:[DonutFormComponent],
  providers: [DonutService],
  selector: 'app-donut-single',
  template: `
    <div>
      <donut-form
        [donut]="donut"
        [isEdit]="isEdit"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      ></donut-form>
    </div>
  `,
  styles: [``],
})
export class DonutSingleComponent {
  donut!: Donut;
  isEdit!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donutService: DonutService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.donutService
      .readById(id)
      .subscribe((donut: Donut) => (this.donut = donut));
    
      this.isEdit = this.route.snapshot.data['isEdit'];

  }

  onCreate(donut: Donut) {
    this.donutService
      .create(donut)
      .subscribe((donut) => this.router.navigate(['admin','donuts',donut.id]));
  }
  //rxjs/ Next is the sucessful callback, instead of error which is the error handler.
  onUpdate(donut: Donut) {
    this.donutService.update(donut).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (err) => console.log('onUpdate error:', err),
    });
  }
  onDelete(donut: Donut) {
    this.donutService
      .delete(donut)
      .subscribe(() => this.router.navigate(['admin']));
  }
}
