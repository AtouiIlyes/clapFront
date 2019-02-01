import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../../core/auth/auth.guard';
import { UserTypesComponent } from './user-types.component';
import { UserTypeNewComponent } from './user-type-new/user-type-new.component';


const usersTypesRoutes: Routes = [
  {

    path: 'types',
    component: UserTypesComponent,
    children: [
      {
        path: 'new',
        component: UserTypeNewComponent,
        canActivate: [AuthGuard],
        data: { function: 'usersTypes.new' }
      },
      {
        path: ':id/edit',
        component: UserTypeNewComponent,
        canActivate: [AuthGuard],
        data: { function: 'usersTypes.edit' }
      },
    ],
    canActivate: [AuthGuard],
    data: { function: 'usersTypes' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(usersTypesRoutes)],
  exports: [RouterModule]
})

export class UserTypesRoutingModule { }
