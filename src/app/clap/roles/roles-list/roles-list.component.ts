import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Role } from '../role.model';
import { RolesService } from '../roles.service';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  roles: Role[];
  roleSubscription: Subscription;
  loading = false;
  numberOfRoles = 0;
  open = [];
  openDeleteRoleConfirm = false;
  roleIdToDelete: number;


  constructor(private router: Router,
    private rolesService: RolesService) { }

  ngOnInit() {
    this.roleSubscription = this.rolesService.getRefreshList().subscribe(
      res => {
        this.loading = true;
        this.openDeleteRoleConfirm = false;
        this.getRoles();
      }
    );

    this.getRoles();
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(
      data => {
        this.roles = data;
        this.numberOfRoles = this.roles.length;

        this.loading = false;
      }
    );
  }

  onEditRole(index: number) {
    this.router.navigate(['/roles', index, 'edit']);
  }

  onDeleteRole() {
    this.rolesService.deleteRole(this.roleIdToDelete);
  }

  onDeleteCancel() {
    this.roleIdToDelete = 0;
    this.openDeleteRoleConfirm = false;

  }

  onDeleteUserAction(id) {
    this.roleIdToDelete = id;
    this.openDeleteRoleConfirm = true;
  }

}
