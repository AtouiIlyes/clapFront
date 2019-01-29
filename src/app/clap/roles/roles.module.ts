import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

import { RolesComponent } from './roles.component';
import { RolesNewComponent } from './roles-new/roles-new.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesRoutingModule } from './roles-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    RolesComponent,
    RolesNewComponent,
    RolesListComponent
  ]
})
export class RolesModule { }
