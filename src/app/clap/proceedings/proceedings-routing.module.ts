import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '#core/auth/auth.guard';

import { ProceedingsComponent } from './proceedings.component';
import { ProceedingsListComponent } from './proceedings-list/proceedings-list.component';
import { ProceedingsEditComponent } from './proceedings-edit/proceedings-edit.component';

const proceedingsRoutes: Routes = [
  {
    path: 'procédures',
    component: ProceedingsComponent,
    children: [
      {
        path: '',
        component: ProceedingsListComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.list' }
      },
      {
        path: 'new',
        component: ProceedingsEditComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.new' }
      },
      {
        path: ':id/edit',
        component: ProceedingsEditComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.edit' }
      },
    ],
    canActivate: [AuthGuard],
    data: { function: 'rights' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(proceedingsRoutes)],
  exports: [RouterModule]
})
export class ProceedingsRoutingModule { }
