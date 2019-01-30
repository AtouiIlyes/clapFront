import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NglModule } from 'ng-lightning/ng-lightning';

import { RolesComponent } from './roles.component';
import { RolesNewComponent } from './roles-new/roles-new.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesRoutingModule } from './roles-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    NglModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    RolesComponent,
    RolesNewComponent,
    RolesListComponent
  ]
})
export class RolesModule { }
