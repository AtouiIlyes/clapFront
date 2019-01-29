import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserNewComponent } from './user-new/user-new.component';
import { AuthGuard } from '../../core/auth/auth.guard';
import { UsersListComponent } from './users-list/users-list.component';


const messagesRoutes: Routes = [
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
  imports: [RouterModule.forChild(messagesRoutes)],
  exports: [RouterModule]
})

export class MessagesRoutingModule { }
