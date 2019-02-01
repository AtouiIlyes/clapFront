import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { UserType } from './user-type.model';
import { environment } from '../../../../environments/environment';

import { MessagesService } from '../../../shared/messages/messages.service';

const API_URL = environment.apiUrl;

@Injectable()
export class UserTypesService {

  usersTypesUpdated = new Subject<any>();

  constructor(private http: HttpClient, private messages: MessagesService) { }

  /**
    * Return list of all users
    *
    * @return array of users
    */
  getUserTypes() {
    return this.http.get<any>(API_URL + '/api/v1/user_types');
  }
  /**
    * Launch usersUpdated event
    *
    * @return an observable who launch events
    */
  public getTypeUserRefreshList(): Observable<any> {
    return this.usersTypesUpdated.asObservable();
  }

  getUserType(index: number) {
    return this.http.get<any>(API_URL + '/api/v1/user_types/' + index);
  }

  addUserType(userType: UserType) {
    const newUserType = {
      user_type: userType,
    };
    return this.http.post<any>(API_URL + '/api/v1/user_types/', newUserType).subscribe(
      (res) => {
        this.messages.success('TYPE UTILISATEUR AJOUTÉ', 'le type d\'utilisateur ' + res.name + ' a bien été ajouté');
        this.usersTypesUpdated.next(res);
        return true;
      },
      err => {
        this.messages.error('TYPE UTILISATEUR NON AJOUTÉ', 'le type d\'utilisateur n\'a pas été ajouté : ' + err);
        return false;
      }
    );
  }

  updateUserType(index: number, userType: UserType) {
    return this.http.put<any>(API_URL + '/api/v1/user_types/' + index, userType).subscribe(
      (res) => {
        this.messages.success('TYPE UTILISATEUR MODIFIÉ', 'le type d\'utilisateur ' + res.name + ' a bien été mis à jour');
        this.usersTypesUpdated.next(res);
      },
      err => {
        this.messages.error('TYPE UTILISATEUR NON MODIFIÉ', 'le type d\'utilisateur n\'a pas été mis à jour : ' + err);
      }
    );
  }

  deleteUserType(index: number) {
    return this.http.delete(API_URL + '/api/v1/user_types/' + index);
  }


}
