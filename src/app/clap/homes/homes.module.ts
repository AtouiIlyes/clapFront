import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DefaultHomeComponent } from './default-home/default-home.component';
import { HomesRoutingModule } from './homes-routing.module';

@NgModule({
  declarations: [
    DefaultHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomesRoutingModule
  ]
})
export class HomesModule { }
