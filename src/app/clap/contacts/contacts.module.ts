import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsService } from './contacts.service';
import { SharedModule } from '#app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NglModule } from 'ng-lightning';
import { ContactsComponent } from './contacts.component';
import { ContactListComponent } from './contact-list/contact-list.component';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactListComponent,
    
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NglModule.forRoot()
  ],
  providers: [ContactsService]
})
export class ContactsModule { }
