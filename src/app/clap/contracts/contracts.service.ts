import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { Contract } from './contracts.model';
import { environment } from '../../../environments/environment';

import { MessagesService } from '#shared/messages/messages.service';

const API_URL = environment.apiUrl;

@Injectable()
export class ContractService {

  contractsUpdated = new Subject<any>();

  constructor(private http: HttpClient, private messages: MessagesService) { }

  /**
    * Return list of all contracts
    *
    * @return array of accounts
    */
  getContracts() {
    return this.http.get<any>(API_URL + '/api/v1/contracts');
  }

  getAccount(index: number) {
    return this.http.get<any>(API_URL + '/api/v1/clients/' + index);
  }
  /**
  * Return list of all users
  *
  * @return array of users
  */
  getUsers() {
    return this.http.get<any>(API_URL + '/api/v1/users');
  }

  /**
  * Return list of all accounts
  *
  * @return array of accounts
  */
  getAccounts() {
    return this.http.get<any>(API_URL + '/api/v1/clients');
  }

  /**
    * Launch contractsUpdated event
    *
    * @return an observable who launch events
    */
  public getContractsRefreshList(): Observable<any> {
    return this.contractsUpdated.asObservable();
  }

  getContract(clientId: number, contractId: number) {
    return this.http.get<any>(API_URL + '/api/v1/clients/' + clientId + '/contracts/' + contractId);
  }

  addContract(clientId: number, contract: Contract) {
    return this.http.post<any>(API_URL + '/api/v1/clients/' + clientId + '/contracts', contract).subscribe(
      (res) => {
        this.messages.success('Contrat AJOUTÉ', 'le contrat  ' + res.name + ' a bien été ajouté');
        this.contractsUpdated.next(res);
      },
      err => {
        this.messages.error('Contrat NON AJOUTÉ', 'le contrat n\'a pas été ajouté : ' + err);
      }
    );
  }

  updateContract(clientId: number, contractId: number, contract: Contract) {
    return this.http.put<any>(API_URL + '/api/v1/clients/' + clientId + '/contracts/' + contractId, contract).subscribe(
      (res) => {
        this.messages.success('CONTRAT MODIFIÉ', 'le contrat ' + res.name + ' a bien été mis à jour');
        this.contractsUpdated.next(res);
      },
      err => {
        this.messages.error('CONTRAT NON MODIFIÉ', 'le contrat n\'a pas été mis à jour : ' + err);
      }
    );
  }

  deleteContract(index: number) {
    return this.http.delete(API_URL + '/api/v1/contracts/' + index);
  }


}
