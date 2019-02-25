import { Component, OnInit } from '@angular/core';
import { MessagesService } from '#app/shared/messages/messages.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [MessagesService]
})
export class ContactsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
