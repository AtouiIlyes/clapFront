import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ContractService } from '../contracts.service';
import { MessagesService } from '#shared/messages/messages.service';
@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit {
  id: number;
  contractDetail: any = [];
  numberOfProcess = 1;
  numberOfBilling = 1;
  loading = true;
  openDeleteContractConfirm = false;
  openContractEditModal = false;
  editMode = false;
  openProcessEditModal = false;
  processCardActions = [];
  billingCardActions = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private messages: MessagesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.contractService.getContract(3, this.id).subscribe(contract => {
          this.contractDetail = contract;
          this.loading = false;
        });
      }
    );
  }

  onToggleBillingCardActions($event: Event, index) {
    $event.stopPropagation();
    this.billingCardActions[index] = true;
  }

  onToggleProcessCardActions($event: Event, index) {
    $event.stopPropagation();
    this.processCardActions[index] = true;
  }
  
  onDeleteContractAction(id) {
    this.openDeleteContractConfirm = true;
  }

  onDeleteCancel() {
    this.openDeleteContractConfirm = false;
  }

  onEditContract() {
    this.openContractEditModal = true;
  }

  onCancelContractModal() {
    this.openContractEditModal = false;
  }

  onEditProcess() {
    this.openProcessEditModal = true;
  }

  onDeleteCancelEditModal() {
    this.openProcessEditModal = false;
  }

  onDeleteContract() {
    this.contractService.deleteContract(this.id).subscribe(
      (res) => {
        this.messages.success('CONTRAT SUPPRIMÉ', 'le contrat a bien été supprimé');
        this.router.navigate(['/contracts']);
        this.openDeleteContractConfirm = false;
      },
      err => {
        this.messages.error('CONTRAT NON SUPPRIMÉ', 'le contrat n\'a pas été supprimé : ' + err);
      }
    );
  }


}
