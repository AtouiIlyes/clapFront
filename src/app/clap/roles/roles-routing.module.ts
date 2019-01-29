import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';

import { RolesComponent} from './roles.component';
import { RolesNewComponent } from './roles-new/roles-new.component';

const rolesRoutes: Routes = [
  {
    path: "roles",
    component: RolesComponent,
    children: [
      {
        path: "new",
        component: RolesNewComponent,
        canActivate: [AuthGuard],
        data: { function: "rights.new" }
      },
      {
        path: ":id/edit",
        component: RolesNewComponent,
        canActivate: [AuthGuard],
        data: { function: "rights.edit" }
      }
    ],
    canActivate: [AuthGuard],
    data: { function: "rights" }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(rolesRoutes)],
  exports: [ RouterModule ]
})
export class RolesRoutingModule { }
