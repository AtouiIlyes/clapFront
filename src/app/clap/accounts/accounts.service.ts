import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { Account } from './accounts.model';
import { environment } from '../../../environments/environment';

import { MessagesService } from '#shared/messages/messages.service';

const API_URL = environment.apiUrl;

@Injectable()
export class AccountService {

  accountsUpdated = new Subject<any>();

  constructor(private http: HttpClient, private messages: MessagesService) { }

  /**
    * Return list of all accounts
    *
    * @return array of accounts
    */
  getAccounts() {
    return this.http.get<any>(API_URL + '/api/v1/clients');
  }

    /**
    * Return list of all accounts
    *
    * @return array of accounts
    */
   getContacts() {
    return this.http.get<any>(API_URL + '/api/v1/clients/contacts');
  }

  /**
    * Launch accountsUpdated event
    *
    * @return an observable who launch events
    */
  public getAccountsRefreshList(): Observable<any> {
    return this.accountsUpdated.asObservable();
  }

  getAccount(index: number) {
    return this.http.get<any>(API_URL + '/api/v1/clients/' + index);
  }

  addAccount(account: Account) {
    return this.http.post<any>(API_URL + '/api/v1/clients/', account).subscribe(
      (res) => {
        this.messages.success('CLIENT AJOUTÉ', 'le client  ' + res.name + ' a bien été ajouté');
        this.accountsUpdated.next(res);
      },
      err => {
        this.messages.error('CLIENT NON AJOUTÉ', 'le client n\'a pas été ajouté : ' + err);
      }
    );
  }

  updateAccount(index: number, account: Account) {
    return this.http.put<any>(API_URL + '/api/v1/clients/' + index, account).subscribe(
      (res) => {
        this.messages.success('CLIENT MODIFIÉ', 'le client ' + res.name + ' a bien été mis à jour');
        this.accountsUpdated.next(res);
      },
      err => {
        this.messages.error('CLIENT NON MODIFIÉ', 'le client n\'a pas été mis à jour : ' + err);
      }
    );
  }

  deleteAccount(index: number) {
    return this.http.delete(API_URL + '/api/v1/clients/' + index);
  }

  deleteContract(index: number) {
    return this.http.delete(API_URL + '/api/v1/contracts/' + index);
  }
  
}
