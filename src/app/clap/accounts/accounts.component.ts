import { Component, OnInit } from '@angular/core';

import { MessagesService } from '../../shared/messages/messages.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers: [MessagesService]
})

export class AccountsComponent implements OnInit {

  constructor() { }


  ngOnInit() {

  }


}
