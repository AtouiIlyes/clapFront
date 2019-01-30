import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
    BrowserAnimationsModule
  ]
})

export class AuthModule {}
