import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NglModule } from 'ng-lightning/ng-lightning';

import { DropdownDirective } from './directives/dropdown.directive';
import { AccessDirective } from './directives/access.directive';
import { MessagesComponent } from './messages/messages.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    DropdownDirective,
    AccessDirective, 
    MessagesComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    NglModule
  ],
  exports: [
    DropdownDirective,
    AccessDirective,
    MessagesComponent,
    ModalComponent
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
