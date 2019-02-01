import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';

import { UserTypesService } from '../user-types.service';
import { MessagesService } from '../../../../shared/messages/messages.service';

@Component({
  selector: 'app-user-types-list',
  templateUrl: './user-types-list.component.html',
  styleUrls: ['./user-types-list.component.scss']
})

export class UserTypesListComponent implements OnInit {
  userTypes = [];
  userTypeIdToDelete: number;
  displayed = [];
  loading = false;
  openDeleteUserTypeConfirm = false;
  userTypeSubscription: Subscription;
  open = [];
  numberOfUsersTypes = 0;

  constructor(private userTypesService: UserTypesService,
    private messages: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;

    this.userTypeSubscription = this.userTypesService.getTypeUserRefreshList().subscribe(
      data => {
        const index = this.userTypes.findIndex(userType => userType.id === data.id);
        if (index > -1) {
          this.userTypes[index] = data;
        } else {
          this.userTypes.push(data);
        }
        this.userTypes = [...this.userTypes];
      }
    );
    this.userTypesService.getUserTypes().subscribe(
      data => {
        this.userTypes = data;
        this.numberOfUsersTypes = this.userTypes.length;
        this.loading = false;
      }
    );
  }

  onEditUserType(index: number) {
    this.router.navigate(['/types', index, 'edit']);
  }

  onDeleteUserType() {
    this.userTypesService.deleteUserType(this.userTypeIdToDelete).subscribe(
      (res) => {
        this.messages.success('TYPE UTILISATEUR SUPPRIMÉ', 'l\'utilisateur a bien été supprimé');
        const index = this.userTypes.findIndex(user => user.id === this.userTypeIdToDelete);
        if (index > -1) {
          this.userTypes.splice(index, 1);
        }
        this.openDeleteUserTypeConfirm = false;
      },
      err => {
        this.messages.error('TYPE UTILISATEUR NON SUPPRIMÉ', 'l\'utilisateur n\'a pas été supprimé : ' + err);
      }
    );
  }

  onDeleteCancel() {
    this.openDeleteUserTypeConfirm = false;
    this.userTypeIdToDelete = 0;
  }

  onDeleteUserTypeAction(id) {
    this.openDeleteUserTypeConfirm = true;
    this.userTypeIdToDelete = id;
  }

  onSort($event: INglDatatableSort) {
    const { key, order } = $event;
    this.userTypes.sort((a: any, b: any) => {
      return (key === 'id' ? b[key] - a[key] : b[key].localeCompare(a[key])) * (order === 'desc' ? 1 : -1);
    });
  }
}
