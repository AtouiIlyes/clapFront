import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './directives/dropdown.directive';
import { AccessDirective } from './directives/access.directive';


@NgModule({
  declarations: [
    DropdownDirective,
    AccessDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    AccessDirective
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
