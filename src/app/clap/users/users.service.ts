import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { User } from './user.model';
import { environment } from '../../../environments/environment';

import { MessagesService } from '../../shared/messages/messages.service';

const API_URL = environment.apiUrl;

@Injectable()
export class UsersService {

  usersUpdated = new Subject<any>();

  constructor(private http: HttpClient, private messages: MessagesService) { }

  /**
    * Return list of all users
    *
    * @return array of users
    */
  getUsers() {
    return this.http.get<any>(API_URL + '/api/v1/users');
  }
  /**
    * Launch usersUpdated event
    *
    * @return an observable who launch events
    */
  public getUserdded(): Observable<any> {
    return this.usersUpdated.asObservable();
  }

  getUser(index: number) {
    return this.http.get<any>(API_URL + '/api/v1/users/' + index);
  }

  addUser(user: User) {
    const newUser = {
      user: user,
    };
    return this.http.post<any>(API_URL + '/api/v1/users/', newUser).subscribe(
      (res) => {
        const message = res;
        this.messages.success('UTILISATEUR AJOUTÉ', 'l\'utilisateur ' + message.name + ' a bien été ajouté');
        this.usersUpdated.next(message);
        return true;
      },
      err => {
        this.messages.error('UTILISATEUR NON AJOUTÉ', 'l\'utilisateur n\'a pas été ajouté : ' + err);
        return false;
      }
    );
  }

  updateUser(index: number, user: User) {
    return this.http.put<any>(API_URL + '/api/v1/users/' + index, user).subscribe(
      (res) => {
        const message = res;
        this.messages.success('UTILISATEUR MODIFIÉ', 'l\'utilisateur ' + message.name + ' a bien été mis à jour');
        this.usersUpdated.next(message);
      },
      err => {
        this.messages.error('UTILISATEUR NON MODIFIÉ', 'l\'utilisateur n\'a pas été mis à jour : ' + err);
      }
    );
  }

  deleteUser(index: number) {
    return this.http.delete(API_URL + '/api/v1/users/' + index);
  }


}
