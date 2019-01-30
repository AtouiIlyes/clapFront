import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  showAlert = false;
  title = '';
  message = '';
  severity = 'success';
  timeout = 5000;
  userSubscription: Subscription;

  constructor(private messages: MessagesService) { }

  ngOnInit() {
    this.userSubscription = this.messages.getMessagesNotifications().subscribe(
      notif => {
        this.title = notif.title;
        this.message = notif.message;
        this.severity = notif.severity;
        this.showAlert = true;
      }
    );
  }

  onClose() {
    this.showAlert = false;
  }
}
