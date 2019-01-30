import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class MessagesService {

  messagesNotifications = new Subject<any>();

  constructor() {
  }

  public success(title: string, message: string) {

    const notif = {
      title: title,
      message: message,
      severity: 'success'
    };
    this.messagesNotifications.next(notif);
  }

  error(title: string, message: string) {
    const notif = {
      title: title,
      message: message,
      severity: 'error'
    };
    this.messagesNotifications.next(notif);

  }

  public getMessagesNotifications(): Observable<any> {
    return this.messagesNotifications.asObservable();
  }
}
