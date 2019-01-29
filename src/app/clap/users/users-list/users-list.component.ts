import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsersService } from '../users.service';
import { MessagesService } from '../../../shared/messages/messages.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  users = [];
  displayed = [];
  loading = false;
  userSubscription: Subscription;


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
        this.loading = false;
        this.users = data;
      }
    );
  }

  onEditUser(index: number) {
    this.router.navigate(['/users', index, 'edit']);
  }

  onDeleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        (res) => {
          this.messages.success('UTILISATEUR SUPPRIMÉ', 'l\'utilisateur a bien été supprimé');
          const index = this.users.findIndex(user => user.id === id);
          if (index > -1) {
            this.users.splice(index, 1);
          }
        },
        err => {
          this.messages.error('UTILISATEUR NON SUPPRIMÉ', 'l\'utilisateur n\'a pas été supprimé : ' + err);
        }
      );
  }
}
