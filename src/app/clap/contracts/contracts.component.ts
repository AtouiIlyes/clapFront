import { Component, OnInit } from '@angular/core';

import { MessagesService } from '../../shared/messages/messages.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
  providers: [MessagesService]

})
export class ContractsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
