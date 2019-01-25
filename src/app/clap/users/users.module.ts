import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

import { MessagesRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UsersService } from './users.service';

//import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserNewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MessagesRoutingModule,
    MatInputModule,
    MatSelectModule,
    //SweetAlert2Module.forRoot()
  ],
  providers: [UsersService]
})

export class UsersModule {}
