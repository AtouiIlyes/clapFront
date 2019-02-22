import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NglModule } from 'ng-lightning/ng-lightning';

import { SharedModule } from '#app/shared/shared.module';
import { ContractsComponent } from './contracts.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractService } from './contracts.service';
import { ContractsRoutingModule } from './contracts-routing.module';
import { BillingComponent } from './billing/billing.component';


@NgModule({
  declarations: [
    ContractsComponent,
    ContractListComponent,
    ContractDetailComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NglModule.forRoot()
  ],
  providers: [ContractService]
})
export class ContractsModule { }
