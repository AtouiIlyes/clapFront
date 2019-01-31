import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NglModule } from 'ng-lightning/ng-lightning';

import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NglModule.forRoot()
  ],
  exports: [HeaderComponent],
  providers: []
})
export class CoreModule {}