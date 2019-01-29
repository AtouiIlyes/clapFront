
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import * as moment from 'moment';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class AuthService {
  token: string;
  user: any = null;
  userLogged = new Subject<any>();
  jwtHelper = new JwtHelperService();

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.user = JSON.parse(localStorage.getItem('currentUserData'));
  }

  public login(login: any) {

    const params = {
      user: login
    };

    return this.http.post(API_URL + '/login', params).pipe(map((response: Response) => {
      // login successful if there's a jwt token in the response
      this.user = response.json();

      // set token property
      this.token = response.headers.get('Authorization');

      if (this.token) {

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(this.token));
        localStorage.setItem('currentUserData', JSON.stringify(this.user));
        localStorage.setItem('expires_at', JSON.stringify(moment().add(86400, 'second').valueOf()));

        this.userLogged.next(true);

        // return true to indicate successful login
        return true;
      } else {
        // return false to indicate failed login
        return false;
      }
    }));
  }

  public getUserLogged(): Observable<any> {
    return this.userLogged.asObservable();
  }

  public getUserData() {
    return JSON.parse(localStorage.getItem('currentUserData'));
  }

  public getUserToken() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public getCurrentUserId() {
    return JSON.parse(localStorage.getItem('currentUserData')).id;
  }

  logout() {
    // remove user from local storage to log user out

    this.token = null;
    this.user = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserData');
    localStorage.removeItem('expires_at');
    this.userLogged.next(false);
  }

  loggedIn() {

    if (moment().isAfter(this.getExpiration())) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserData');
      localStorage.removeItem('expires_at');
    }

    const token = localStorage.getItem('currentUser');
    if (!token) return false;

    return !this.jwtHelper.isTokenExpired(token);
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
