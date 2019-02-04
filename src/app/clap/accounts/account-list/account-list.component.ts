import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import * as moment from 'moment';

import { AccountService } from '../accounts.service';
import { MessagesService } from '#shared/messages/messages.service'; ``

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  accounts = [];
  accountIdToDelete: number;
  loading = true;
  openDeleteAccountConfirm = false;
  openAccountEditModal = false;
  accountSubscription: Subscription;
  accountActions = [];
  numberOfAccounts = 0;
  lastUpdatedAccountDate: string;

  constructor(private accountService: AccountService,
    private messages: MessagesService,
    private router: Router) { }

  ngOnInit() {
    moment.locale('fr');

    this.accountSubscription = this.accountService.getAccountsRefreshList().subscribe(
      data => {
        const index = this.accounts.findIndex(account => account.id === data.id);
        if (index > -1) {
          this.accounts[index] = data;
        } else {
          this.accounts.push(data);
        }
        this.accounts = [...this.accounts];
      }
    );
    this.accountService.getAccounts().subscribe(
      data => {
        this.accounts = data;
        this.numberOfAccounts = this.accounts.length;
        if (this.numberOfAccounts > 0) {
          const lastUpdatedAccount = this.accounts[this.accounts.length - 1].updated_at;
          this.lastUpdatedAccountDate = moment(lastUpdatedAccount).fromNow();
        }
        this.loading = false;
      }
    );
  }

  onEditAccount(index: number) {
    this.openAccountEditModal = true;
    // this.router.navigate(['/users', index, 'edit']);
  }

  onDeleteAccount() {
    this.accountService.deleteAccount(this.accountIdToDelete).subscribe(
      (res) => {
        this.messages.success('CLIENT SUPPRIMÉ', 'le client a bien été supprimé');
        const index = this.accounts.findIndex(user => user.id === this.accountIdToDelete);
        if (index > -1) {
          this.accounts.splice(index, 1);
        }
        this.openDeleteAccountConfirm = false;
      },
      err => {
        this.messages.error('CLIENT NON SUPPRIMÉ', 'le client n\'a pas été supprimé : ' + err);
      }
    );
  }

  onDeleteCancel() {
    this.openDeleteAccountConfirm = false;
    this.accountIdToDelete = 0;
  }

  onDeleteCancelEditModal() {
    this.openAccountEditModal = false;
  }

  onDeleteAccountAction(id) {
    this.openDeleteAccountConfirm = true;
    this.accountIdToDelete = id;
  }

  onSaveAndNewAccount(){
    this.openAccountEditModal = false;
    setTimeout(() => {
      this.openAccountEditModal = true;
    }, 400);
  }

  onSort($event: INglDatatableSort) {
    const { key, order } = $event;
    this.accounts.sort((a: any, b: any) => {
      return (key === 'id' ? b[key] - a[key] : b[key].localeCompare(a[key])) * (order === 'desc' ? 1 : -1);
    });
  }

  lookup = (query: string, source = this.accounts): string[] => {
    if (!query) {
      return null;
    }

    return source.filter((d: string) => d.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
}

