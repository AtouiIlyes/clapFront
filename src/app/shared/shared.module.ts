import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NglModule } from 'ng-lightning/ng-lightning';

import { DropdownDirective } from './directives/dropdown.directive';
import { AccessDirective } from './directives/access.directive';
import { MessagesComponent } from './messages/messages.component';
import { ModalComponent } from './modal/modal.component';
import { ContractEditComponent } from '../clap/contracts/contract-edit/contract-edit.component';
import { ProceedingsEditComponent } from '#app/clap/proceedings/proceedings-edit/proceedings-edit.component';


@NgModule({
  declarations: [
    DropdownDirective,
    AccessDirective, 
    MessagesComponent,
    ModalComponent,
    ContractEditComponent,
    ProceedingsEditComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NglModule
  ],
  exports: [
    DropdownDirective,
    AccessDirective,
    MessagesComponent,
    ModalComponent,
    ContractEditComponent,
    ProceedingsEditComponent
    
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
