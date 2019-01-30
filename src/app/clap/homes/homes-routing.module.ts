import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/auth/auth.guard';

import { DefaultHomeComponent } from './default-home/default-home.component';



const homesRoutes: Routes = [
  {
    path: 'homes',
    component: DefaultHomeComponent,
    canActivate: [AuthGuard],
    data: { function: 'rights' }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(homesRoutes)],
  exports: [ RouterModule ]
})
export class RolesRoutingModule { }
