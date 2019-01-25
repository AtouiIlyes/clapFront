import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



import { UsersModule } from './users/users.module';
import { from } from 'rxjs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UsersModule,
  ],
  providers: []
})
export class ClapModule { }
