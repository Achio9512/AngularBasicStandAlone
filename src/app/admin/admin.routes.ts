import { Routes } from '@angular/router';
/*Containers*/
import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';
/*Components*/

export const AdminRoutes: Routes = [
  {
    path: 'donuts',
    loadComponent: () =>
      import('../admin/containers/donut-list/donut-list.component').then(
        (x) => x.DonutListComponent
      ),
  },
  {
    path: 'donuts/new',
    loadComponent: () =>
      import('../admin/containers/donut-single/donut-single.component').then(
        (x) => x.DonutSingleComponent
      ),
    data: { isEdit: false },
  },
  {
    path: 'donuts/:id',
    loadComponent: () =>
      import('../admin/containers/donut-single/donut-single.component').then(
        (x) => x.DonutSingleComponent
      ),
    data: { isEdit: true },
  },
  { path: '', pathMatch: 'full', redirectTo: 'donuts' },
];
