import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Role } from './role.model';
import { environment } from '../../../environments/environment';
import { MessagesService } from '#shared/messages/messages.service';

const API_URL = environment.apiUrl;

@Injectable()
export class RolesService {
  rolesListUpdated = new Subject<any>();

  constructor(private http: HttpClient, private messages: MessagesService) { }

  /**
    * Return list of all users
    *
    * @return array of users
    */
  getRoles() {
    return this.http.get<any>(API_URL + '/api/v1/roles');
  }

  getRole(index: number) {
    return this.http.get<any>(API_URL + '/api/v1/roles/' + index);
  }

  addRole(role: Role) {
    return this.http.post<any>(API_URL + '/api/v1/roles/', { role: role })
      .subscribe(
        (res) => {
          const rl = res;
          this.rolesListUpdated.next();
          this.messages.success('RÔLE CRÉÉ', 'le role ' + rl.name + ' a bien été créé');
        },
        err => {
          this.messages.error('RÔLE NON CRÉÉ', 'le role n\'a pas été créé : ' + err);
        }
      );
  }

  updateRole(index: number, newRole: Role) {
    return this.http.put<any>(API_URL + '/api/v1/roles/' + index, { role: newRole })
      .subscribe(
        (res) => {
          const rl = res;
          this.rolesListUpdated.next();
          this.messages.success('RÔLE MODIFIÉ', 'le role ' + rl.name + ' a bien été mis à jour');
        },
        err => {
          this.messages.error('RÔLE NON MODIFIÉ', 'le role n\'a pas été mis à jour : ' + err);
        }
      );
  }

  deleteRole(index: number) {
    return this.http.delete(API_URL + '/api/v1/roles/' + index);
  }

  getPermissions() {
    return this.http.get<any>(API_URL + '/api/v1/permissions');
  }

  getRefreshList(): Observable<any> {
    return this.rolesListUpdated.asObservable();
  }
}
