import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NglModule } from 'ng-lightning/ng-lightning';

import { SharedModule } from 'src/app/shared/shared.module';
import { UserTypeNewComponent } from './user-type-new/user-type-new.component';
import { UserTypesListComponent } from './user-types-list/user-types-list.component';
import { UserTypesComponent } from './user-types.component';
import { UserTypesService } from './user-types.service';
import { UserTypesRoutingModule } from './user-types-routing.module';



@NgModule({
  declarations: [
    UserTypeNewComponent,
    UserTypesListComponent,
    UserTypesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    UserTypesRoutingModule,
    ReactiveFormsModule,
    NglModule.forRoot()
  ],
  providers: [UserTypesService]
})

export class UserTypesModule { }
