import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';


// declare var $: any;
import * as $ from 'jquery';


@Injectable()
export class MessagesService {

  settings = {
    animate: 'fromRight',
    position: ['top', 'right'],
    clickToClose: true,
    pauseOnHover: true,
    showProgressBar: true,
    timeOut: 5000,
  }


  constructor(private notifications: NotificationsService) {
    // this.launcher.subscribe(error => this.displayMessage(error));
  }

  success(title: string, message: string) {
    // console.log(this.notifications);

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
