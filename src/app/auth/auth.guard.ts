import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const url = state.url;
    const first_level = url.split(/[\s/]+/)[1];
    const permissions = this.auth.getUserData().role.permissions;


    if (this.auth.loggedIn()) {

      if (first_level === 'home') {
        return true;
      } else {
        if (permissions.filter(e => e.name === next.data['function']).length > 0) {
          // console.log('permission');
          return true;
        } else {
          // console.log('not permission');
          return false;
        }
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
