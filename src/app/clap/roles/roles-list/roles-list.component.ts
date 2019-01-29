import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Role } from '../role.model';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  roles: Role[];
  roleSubscription: Subscription;
  loading = false;


  constructor(private router: Router,
    private rolesService: RolesService) { }

  ngOnInit() {
    this.roleSubscription = this.rolesService.getRefreshList().subscribe(
      res => {
        this.getRoles();
        this.loading = true;
      }
    );

    this.getRoles();
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(
      data => {
        this.roles = data;
        this.loading = false;
      }
    );
  }

  onEditRole(index: number) {
    this.router.navigate(['/roles', index, 'edit']);
  }

  onDeleteRole(index: number) {
    this.rolesService.deleteRole(index);
  }

}
