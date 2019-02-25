import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { HomesModule } from './homes/homes.module';
import { AccountsModule } from './accounts/accounts.module';
import { ContractsModule } from './contracts/contracts.module';
import { ProceedingsModule } from './proceedings/proceedings.module';
import { ContactsModule } from './contacts/contacts.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UsersModule,
    RolesModule,
    HomesModule,
    AccountsModule,
    ContractsModule,
    ProceedingsModule,
    ContactsModule
  ],
  providers: []
})
export class ClapModule { }
