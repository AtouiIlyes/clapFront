import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { MessagesService } from '#app/shared/messages/messages.service';
import { environment } from '../../../environments/environment';
import { Contact } from './contact';

const API_URL = environment.apiUrl;

@Injectable()
export class ContactsService {

  contactsUpdated = new Subject<any>();

  constructor(private http: HttpClient, private messages: MessagesService) { }

  /**
    * Return list of all contacts
    *
    * @return array of contacts
    */
  getContacts() {
    return this.http.get<any>(API_URL + '/api/v1/clients/contacts');
  }


  /**
    * Launch contactsUpdated event
    *
    * @return an observable who launch events
    */
  public getContactsRefreshList(): Observable<any> {
    return this.contactsUpdated.asObservable();
  }

  getContact(index: number) {
    return this.http.get<any>(API_URL + '/api/v1/clients/contacts' + index);
  }

  addContact(contact: Contact) {
    return this.http.post<any>(API_URL + '/api/v1/clients/', contact).subscribe(
      (res) => {
        this.messages.success('CONTACT AJOUTÉ', 'le contact  ' + res.name + ' a bien été ajouté');
        this.contactsUpdated.next(res);
      },
      err => {
        this.messages.error('CLIENT NON AJOUTÉ', 'le client n\'a pas été ajouté : ' + err);
      }
    );
  }

  updateContact(index: number, contact: Contact) {
    return this.http.put<any>(API_URL + '/api/v1/clients/' + index, contact).subscribe(
      (res) => {
        this.messages.success('CONTACT MODIFIÉ', 'le contact ' + res.name + ' a bien été mis à jour');
        this.contactsUpdated.next(res);
      },
      err => {
        this.messages.error('CONTACT NON MODIFIÉ', 'le contact n\'a pas été mis à jour : ' + err);
      }
    );
  }

  deleteContact(index: number) {
    return this.http.delete(API_URL + '/api/v1/clients/' + index);
  }

 
}
