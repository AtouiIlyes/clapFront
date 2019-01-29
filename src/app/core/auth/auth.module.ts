import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SigninComponent } from './signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({

  declarations: [
    SigninComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    MatInputModule,
    BrowserAnimationsModule
  ]
})

export class AuthModule {}
