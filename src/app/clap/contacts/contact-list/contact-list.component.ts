import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { MessagesService } from '#app/shared/messages/messages.service';
import { ContactsService } from '../contacts.service';
import { INglDatatableSort } from 'ng-lightning';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts = [];
  contactIdToDelete: number;
  contactIdToEdit: number;
  loading = true;
  openDeleteContactConfirm = false;
  openContactEditModal = false;
  contactSubscription: Subscription;
  contactActions = [];
  numberOfContact = 0;
  lastUpdatedContactDate: string;

  constructor(private contactService: ContactsService,
    private messages: MessagesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    moment.locale('fr');
    this.contactSubscription = this.contactService.getContactsRefreshList().subscribe(
      data => {
        const index = this.contacts.findIndex(contact => contact.id === data.id);
        if (index > -1) {
          this.contacts[index] = data;
        } else {
          this.contacts.push(data);
        }
        this.contacts = [...this.contacts];
      }
    );
    this.contactService.getContacts().subscribe(
      data => {
        this.contacts = data;
        this.numberOfContact = this.contacts.length;
        if (this.numberOfContact > 0) {
          const lastUpdatedContact = this.contacts[this.contacts.length - 1].updated_at;
          this.lastUpdatedContactDate = moment(lastUpdatedContact).fromNow();
          this.loading = false;
        }
        this.loading = false;
      }
    );
  }

  onEditContact(id) {
    this.contactIdToEdit = id;
    this.openContactEditModal = true;
  }

  onDeleteContact() {
    this.contactService.deleteContact(this.contactIdToDelete).subscribe(
      (res) => {
        this.messages.success('CONTACT SUPPRIMÉ', 'le contact a bien été supprimé');
        const index = this.contacts.findIndex(contact => contact.id === this.contactIdToDelete);
        if (index > -1) {
          this.contacts.splice(index, 1);
        }
        this.openDeleteContactConfirm = false;
      },
      err => {
        this.messages.error('CONTACT NON SUPPRIMÉ', 'le contact n\'a pas été supprimé : ' + err);
      }
    );
  }

  onDeleteCancel() {
    this.openDeleteContactConfirm = false;
    this.contactIdToDelete = 0;
  }

  onDeleteCancelEditModal() {
    this.openContactEditModal = false;
  }

  onDeleteContactAction(id) {
    this.openDeleteContactConfirm = true;
    this.contactIdToDelete = id;
  }

  onSaveAndNewAccount() {
    this.openContactEditModal = false;
    setTimeout(() => {
      this.openContactEditModal = true;
    }, 400);
  }

  onShowContactsDetails(index) {
    this.router.navigate(['/accounts', index]);
  }

  onSort($event: INglDatatableSort) {
    const { key, order } = $event;
    this.contacts.sort((a: any, b: any) => {
      return (key === 'id' ? b[key] - a[key] : b[key].localeCompare(a[key])) * (order === 'desc' ? 1 : -1);
    });
  }

  onCancel() {
    this.openContactEditModal = !this.openContactEditModal;
  }

}