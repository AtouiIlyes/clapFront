import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsersService } from '../users.service';
import { MessagesService } from '../../../shared/messages/messages.service';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  users = [];
  userIdToDelete: number;
  displayed = [];
  loading = false;
  openDeleteUserConfirm = false;
  userSubscription: Subscription;
  open = false;
  numberOfUsers = 0;

  constructor(private userService: UsersService,
    private messages: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;

    this.userSubscription = this.userService.getUserdded().subscribe(
      data => {
        const index = this.users.findIndex(user => user.id === data.id);
        if (index > -1) {
          this.users[index] = data;
        } else {
          this.users.push(data);
        }
        this.users = [...this.users];
      }
    );
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        this.numberOfUsers = this.users.length;
        this.loading = false;
      }
    );
  }

  onEditUser(index: number) {
    this.router.navigate(['/users', index, 'edit']);
  }

  onDeleteUser() {
    this.userService.deleteUser(this.userIdToDelete)
      .subscribe(
        (res) => {
          this.messages.success('UTILISATEUR SUPPRIMÉ', 'l\'utilisateur a bien été supprimé');
          const index = this.users.findIndex(user => user.id === id);
          if (index > -1) {
            this.users.splice(index, 1);
          }
          this.openDeleteUserConfirm = false;
        },
        err => {
          this.messages.error('UTILISATEUR NON SUPPRIMÉ', 'l\'utilisateur n\'a pas été supprimé : ' + err);
        }
      );
  }

  onDeleteCancel() {
    this.openDeleteUserConfirm = false;
    this.userIdToDelete = 0;
  }

  onDeleteUserAction(id) {
    this.openDeleteUserConfirm = true;
    this.userIdToDelete = id;
  }

}
