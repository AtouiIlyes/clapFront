import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NglModule } from 'ng-lightning/ng-lightning';

import { SharedModule } from '#app/shared/shared.module';

import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountService } from './accounts.service';
import { AccountsRoutingModule } from './accounts-routing.module';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountDetailComponent,
    AccountEditComponent
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
