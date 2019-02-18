import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '#core/auth/auth.guard';
import { ContractsComponent } from './contracts.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractEditComponent } from './contract-edit/contract-edit.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';


const contractsRoutes: Routes = [
  {
    path: 'contracts',
    component: ContractsComponent,
    children: [
      {
        path: '',
        component: ContractListComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.list' }
      },
      {
        path: 'new',
        component: ContractEditComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.new' }
      },
      {
        path: ':id/edit',
        component: ContractEditComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.edit' }
      },
      {
        path: ':id',
        component: ContractDetailComponent,
        canActivate: [AuthGuard],
        data: { function: 'rights.edit' }
      }
    ],
    canActivate: [AuthGuard],
    data: { function: 'rights' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(contractsRoutes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
