import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import * as moment from 'moment';

import { ContractService } from '../contracts.service';
import { MessagesService } from '#shared/messages/messages.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {
  contracts = [];
  contractIdToDelete: number;
  clientId: number;
  contractId: number;
  loading = true;
  openDeleteContractConfirm = false;
  openContractEditModal = false;
  accountSubscription: Subscription;
  contractActions = [];
  numberOfContracts = 0;
  lastUpdatedAContractDate: string;

  constructor(private contractService: ContractService,
    private messages: MessagesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    moment.locale('fr');
    this.accountSubscription = this.contractService.getContractsRefreshList().subscribe(
      data => {
        const index = this.contracts.findIndex(account => account.id === data.id);
        if (index > -1) {
          this.contracts[index] = data;
        } else {
          this.contracts.push(data);
        }
        this.contracts = [...this.contracts];
      }
    );
    this.contractService.getContracts().subscribe(
      data => {
        this.contracts = data;
        this.numberOfContracts = this.contracts.length;
        if (this.numberOfContracts > 0) {
          const lastUpdatedContract = this.contracts[this.contracts.length - 1].updated_at;
          this.lastUpdatedAContractDate = moment(lastUpdatedContract).fromNow();
        }
        this.loading = false;
      }
    );
  }
  onNewContract() {
    this.openContractEditModal = true;
    this.contractId = null;
    this.clientId = null;

  }

  onEditContract(contractId, clientId) {
    this.openContractEditModal = true;
    this.clientId = clientId;
    this.contractId = contractId;
  }

  onDeleteContract() {
    this.contractService.deleteContract(this.contractIdToDelete).subscribe(
      (res) => {
        this.messages.success('CONTRAT SUPPRIMÉ', 'le contrat a bien été supprimé');
        const index = this.contracts.findIndex(user => user.id === this.contractIdToDelete);
        if (index > -1) {
          this.contracts.splice(index, 1);
        }
        this.openDeleteContractConfirm = false;
      },
      err => {
        this.messages.error('CONTRAT NON SUPPRIMÉ', 'le contrat n\'a pas été supprimé : ' + err);
      }
    );
  }


  onDeleteCancel() {
    this.openDeleteContractConfirm = false;
    this.contractIdToDelete = 0;
  }

  onCancelContractModal() {
    this.openContractEditModal = false;
  }

  onDeleteContractAction(id) {
    this.openDeleteContractConfirm = true;
    this.contractIdToDelete = id;
  }

  onSaveAndNewContract() {
    this.openContractEditModal = false;
    setTimeout(() => {
      this.openContractEditModal = true;
    }, 400);
  }

  onShowContractDetails(index) {
    this.router.navigate(['/contracts', index]);
  }

  onSort($event: INglDatatableSort) {
    const { key, order } = $event;
    this.contracts.sort((a: any, b: any) => {
      return (key === 'id' ? b[key] - a[key] : b[key].localeCompare(a[key])) * (order === 'desc' ? 1 : -1);
    });
  }

  onCancel() {
    this.openContractEditModal = !this.openContractEditModal;
  }

  lookup = (query: string, source = this.contracts): string[] => {
    if (!query) {
      return null;
    }

    return source.filter((d: string) => d.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }

}
