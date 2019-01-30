import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NglModule } from 'ng-lightning/ng-lightning';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthService } from './core/auth/auth.service';
import { AuthModule } from './core/auth/auth.module';
import { ClapModule } from './clap/clap.module';
import { MessagesService } from './shared/messages/messages.service';
import { CoreModule } from './core/core.module';

import { MessagesService } from './shared/messages/messages.service';
import { MessagesComponent } from './shared/messages/messages.component';
import { SharedModule } from './shared/shared.module';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    AuthModule,
    HttpClientModule,
    ClapModule,
    SharedModule,
    CoreModule,
    NglModule.forRoot()
  ],
  providers: [
    MessagesService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
