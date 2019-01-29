import { Component, OnInit } from '@angular/core';

import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [RolesService]
})
export class RolesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
