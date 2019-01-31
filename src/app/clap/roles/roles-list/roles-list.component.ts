import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';


import { Role } from '../role.model';
import { RolesService } from '../roles.service';
import { MessagesService } from '../../../shared/messages/messages.service';


@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  roles: Role[];
  roleSubscription: Subscription;
  loading = true;
  numberOfRoles = 0;
  open = [];
  openDeleteRoleConfirm = false;
  roleIdToDelete: number;
  sort: INglDatatableSort = { key: 'id', order: 'asc' };


  constructor(private router: Router,
    private messages: MessagesService,
    private rolesService: RolesService) { }

  ngOnInit() {
    this.roleSubscription = this.rolesService.getRefreshList().subscribe(
      res => {
        this.loading = false;
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
    this.rolesService.deleteRole(this.roleIdToDelete).subscribe(
      (res) => {
        this.messages.success('RÔLE SUPPRIMÉ', 'le role a bien été supprimé');
        const index = this.roles.findIndex(role => role.id === this.roleIdToDelete);
        if (index > -1) {
          this.roles.splice(index, 1);
        }
        this.openDeleteRoleConfirm = false;
      },
      err => {
        this.messages.error('RÔLE NON SUPPRIMÉ', 'le role n\'a pas été supprimé : ' + err);
      }
    );
  }

  onDeleteCancel() {
    this.roleIdToDelete = 0;
    this.openDeleteRoleConfirm = false;

  }

  onDeleteUserAction(id) {
    this.roleIdToDelete = id;
    this.openDeleteRoleConfirm = true;
  }

  onSort($event: INglDatatableSort) {
    const { key, order } = $event;
    this.roles.sort((a: any, b: any) => {
      return (key === 'id' ? b[key] - a[key] : b[key].localeCompare(a[key])) * (order === 'desc' ? 1 : -1);
    });
  }

}
