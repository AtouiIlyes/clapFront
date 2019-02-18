import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import * as moment from 'moment';

import { AccountService } from '../accounts.service';
import { MessagesService } from '#shared/messages/messages.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  accounts = [];
  accountIdToDelete: number;
  accountIdToEdit: number;
  loading = true;
  openDeleteAccountConfirm = false;
  openAccountEditModal = false;
  accountSubscription: Subscription;
  accountActions = [];
  numberOfAccounts = 0;
  lastUpdatedAccountDate: string;

  constructor(private accountService: AccountService,
    private messages: MessagesService,
    private route: ActivatedRoute,
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
          this.loading = false;
        }
        this.loading = false;
      }
    );
  }

  onEditAccount(id) {
    this.accountIdToEdit = id;
    this.openAccountEditModal = true;
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

  onSaveAndNewAccount() {
    this.openAccountEditModal = false;
    setTimeout(() => {
      this.openAccountEditModal = true;
    }, 400);
  }

  onShowAccountDetails(index) {
    this.router.navigate(['/accounts', index]);
  }

  onSort($event: INglDatatableSort) {
    const { key, order } = $event;
    this.accounts.sort((a: any, b: any) => {
      return (key === 'id' ? b[key] - a[key] : b[key].localeCompare(a[key])) * (order === 'desc' ? 1 : -1);
    });
  }

  onCancel() {
    this.openAccountEditModal = !this.openAccountEditModal;
  }

  lookup = (query: string, source = this.accounts): string[] => {
    let temp = [];
    if (!query) {
      for (const m of source) {
        temp.push(m.name + ' ')
      }
    } else {
      const temp2 = source.filter(account => account.name.indexOf(query.toLowerCase()) > -1);
      for (const m of temp2) {
        temp.push(m.name + ' ')
      }
    }
    return temp;
  }
}

