import { Component, OnInit } from '@angular/core';

import { DropdownDirective } from '#shared/directives/dropdown.directive';
import { AccessDirective } from '#shared/directives/access.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
