import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';


@Injectable()
export class MessagesService {

  settings = {
    animate: 'fromRight',
    position: ['top', 'right'],
    clickToClose: true,
    pauseOnHover: true,
    showProgressBar: true,
    timeOut: 5000,
  };


  constructor(private notifications: NotificationsService) {
  }

  success(title: string, message: string) {

    this.notifications.success(title, message, {
      position: ['top', 'left'],
      animate: 'fromRight',
      clickToClose: true,
      pauseOnHover: true,
      showProgressBar: true,
      timeOut: 5000,
    });
  }

  error(title: string, message: string) {
    this.notifications.error(title, message, this.settings);
  }
}
