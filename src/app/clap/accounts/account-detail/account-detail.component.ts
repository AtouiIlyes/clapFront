import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AccountService } from '../accounts.service';
import { MessagesService } from '#shared/messages/messages.service';
@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  id: number;
  accountDetail: any = [];
  accountContracts = [];
  numberOfContracts = 0;
  loading = true;
  openDeleteAccountConfirm = false;
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
          this.loading = false;
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
    this.commercialActions[index] = true;
  }

  onToggleOperationnelActions($event: Event, index) {
    $event.stopPropagation();
    this.operationnelActions[index] = true;
  }

  onDeleteAccountAction() {
    this.openDeleteAccountConfirm = true;
  }

  onDeleteCancel() {
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
}
