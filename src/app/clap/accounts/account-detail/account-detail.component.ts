import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AccountService } from '../accounts.service';
import { MessagesService } from '#shared/messages/messages.service';
@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],

})
export class AccountDetailComponent implements OnInit {
  id: number;
  accountDetail: any = [];
  accountContracts = [];
  numberOfContracts = 0;
  billingContacts = [];
  operationalContacts = [];
  numberOfContacts = 0;
  contractIdToDelete: number;
  loading = true;
  openDeleteAccountConfirm = false;
  openContractEditModal = false;
  openDeleteContractConfirm = false;
  openAccountEditModal = false;
  contractId: number;
  commercialActions = [];
  contractCardActions = [];
  operationnelActions = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private messages: MessagesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.accountService.getAccount(this.id).subscribe(account => {
          this.accountDetail = account;
          this.accountContracts = account.contracts;
          this.numberOfContracts = this.accountContracts.length;
          this.accountService.getContacts().subscribe(contacts => {
            this.billingContacts = contacts.billing;
            this.operationalContacts = contacts.operational;
            this.numberOfContacts = this.billingContacts.length + this.operationalContacts.length;
            this.loading = false;
          })
        });
      }
    );
  }

  onToggleCommercialActions($event: Event, index) {
    $event.stopPropagation();
    this.commercialActions[index] = true;
  }

  onToggleContractCardActions($event: Event, index) {
    $event.stopPropagation();
    this.contractCardActions[index] = true;
  }

  onToggleOperationnelActions($event: Event, index) {
    $event.stopPropagation();
    this.operationnelActions[index] = true;
  }

  onDeleteAccountAction() {
    this.openDeleteAccountConfirm = true;
  }

  onDeleteContractCancel() {
    this.openDeleteContractConfirm = false;
    this.contractIdToDelete = 0;
  }

  onDeleteAccountCancel() {
    this.openDeleteAccountConfirm = false;
  }
  onDeleteAccount() {
    this.accountService.deleteAccount(this.id).subscribe(
      (res) => {
        this.router.navigate(['/accounts', { queryParams: { deleteNotification: true } }]);
      },
      err => {
        this.messages.error('CLIENT NON SUPPRIMÉ', 'le client n\'a pas été supprimé : ' + err);
      }
    );
  }

  onEditAccount() {
    this.openAccountEditModal = true;
  }

  onNewContract() {
    this.openContractEditModal = true;
    this.contractId = null;

  }

  onEditContract(id) {
    this.openContractEditModal = true;
    this.contractId = id;
  }

  onCancelEditModal() {
    this.openContractEditModal = false;
  }

  onDeleteCancelEditModal() {
    this.openAccountEditModal = false;
  }

  onDeleteContractAction(id) {
    this.openDeleteContractConfirm = true;
    this.contractIdToDelete = id;
  }

  onShowContractDetails(index) {
    this.router.navigate(['/contracts', index]);
  }

  onShowHierarchy() {
    this.router.navigate(['/accounts', this.id , 'hierarchy']);
  }

  onDeleteContract() {
    this.accountService.deleteContract(this.contractIdToDelete).subscribe(
      (res) => {
        this.messages.success('CONTRAT SUPPRIMÉ', 'le contrat a bien été supprimé');
        const index = this.accountContracts.findIndex(user => user.id === this.contractIdToDelete);
        if (index > -1) {
          this.accountContracts.splice(index, 1);
        }
        this.openDeleteContractConfirm = false;
      },
      err => {
        this.messages.error('CONTRAT NON SUPPRIMÉ', 'le contrat n\'a pas été supprimé : ' + err);
      }
    );
  }
}
