import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class MessagesService {

  messagesNotifications = new Subject<any>();

  constructor() {
  }

  public success(title: string, message: string) {

    this.messagesNotifications.next({
      title: title,
      message: message,
      severity: 'success'
    });

  }

  error(title: string, message: string) {

    this.messagesNotifications.next({
      title: title,
      message: message,
      severity: 'error'
    });
  }

  public getMessagesNotifications(): Observable<any> {
    return this.messagesNotifications.asObservable();
  }
}
