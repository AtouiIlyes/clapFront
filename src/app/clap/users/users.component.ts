import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessagesService } from '../../shared/messages/messages.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessagesService]
})

export class UsersComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit() {

  }

  onNewUser() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
