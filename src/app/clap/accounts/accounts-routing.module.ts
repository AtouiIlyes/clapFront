import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '#core/auth/auth.guard';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';


const accountsRoutes: Routes = [
  {
    path: 'accounts',
    component: AccountListComponent,
    children: [
      {
        path: 'new',
        component: AccountEditComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.new' }
      },
      {
        path: ':id/edit',
        component: AccountEditComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.edit' }
      },
      {
        path: ':id',
        component: AccountDetailComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.edit' }
      }
    ],
    canActivate: [AuthGuard],
    data: { function: 'rights' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(accountsRoutes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
