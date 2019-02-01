import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountEditComponent } from './account-edit/account-edit.component';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountDetailComponent,
    AccountEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccountsModule { }
