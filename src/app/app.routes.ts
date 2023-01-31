import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { Routes} from '@angular/router';

import { DonutService } from './admin/services/donut.service';

//Routes will be evaluted line by line. So the last one should be the default route.
export const routes: Routes = [
  { 
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((x) => x.AdminRoutes),
    providers:[importProvidersFrom(HttpClientModule)/*, DonutService*/]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin'
  },
  {
    path: '**',
    redirectTo: 'admin'
  }
];

