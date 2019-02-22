import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NglModule } from 'ng-lightning/ng-lightning';

import { SharedModule } from '#app/shared/shared.module';

import { AccountsComponent } from './accounts.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountService } from './accounts.service';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountHierarchyComponent } from './account-hierarchy/account-hierarchy.component';
import { AccountBankComponent } from './account-bank/account-bank.component';

@NgModule({
  declarations: [
    AccountsComponent,
    AccountListComponent,
    AccountDetailComponent,
    AccountEditComponent,
    AccountHierarchyComponent,
    AccountBankComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NglModule.forRoot()
  ],
  providers: [AccountService]
})
export class AccountsModule { }
