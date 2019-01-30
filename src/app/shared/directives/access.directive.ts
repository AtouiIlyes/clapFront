import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[authorized]'
})
export class AccessDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService
  ) {}

  @Input()
  set authorized(authorisation: any) {
    // const permissions = this.auth.getUserData().role.permissions;

    // if (permissions) {
    //   if (permissions.filter(e => e.name === authorisation).length > 0) {
    //     this.viewContainer.createEmbeddedView(this.templateRef);
    //   } else {
    //     this.viewContainer.clear();
    //   }
    // }

    if (authorisation === 'loggued') {
      if (this.auth.loggedIn()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
  }
}
