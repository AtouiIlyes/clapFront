import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserNewComponent } from './user-new/user-new.component';
import { AuthGuard } from '../../auth/auth.guard';


const usersRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'new',
        component: UserNewComponent,
        canActivate: [AuthGuard],
        data: { function: 'users.new' }
      },
      {
        path: ':id/edit',
        component: UserNewComponent,
        canActivate: [AuthGuard],
        data: { function: 'users.edit' }
      }
    ],
    canActivate: [AuthGuard],
    data: { function: 'users' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }
