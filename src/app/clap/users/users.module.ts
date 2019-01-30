import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NglModule } from 'ng-lightning/ng-lightning';


import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UsersService } from './users.service';
import { ModalComponent } from '../../shared/modal/modal.component';



@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserNewComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    NglModule.forRoot()
  ],
  providers: [UsersService]
})

export class UsersModule { }
