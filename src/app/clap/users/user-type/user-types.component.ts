import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessagesService } from '../../../shared/messages/messages.service';

@Component({
  selector: 'app-user-types',
  templateUrl: './user-types.component.html',
  styleUrls: ['./user-types.component.scss'],
  providers: [MessagesService]
})

export class UserTypesComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {

  }

  onNewUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
