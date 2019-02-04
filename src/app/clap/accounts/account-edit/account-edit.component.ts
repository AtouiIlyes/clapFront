import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AccountService } from '../accounts.service';
import { MessagesService } from '#shared/messages/messages.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {

  pickActivities: any = [];
  openActivityPickList = false;
  id: number;
  editMode = false;
  loading = true;
  accountForm: FormGroup;

  activities = [
    { value: 'Item 1', icon: 'kanban' },
    { value: 'Item 2', icon: 'side_list' },
    { value: 'Item 3', icon: 'table' },
  ];

  @Input() open: boolean;
  @Output() cancel = new EventEmitter<Boolean>();
  @Output() saveAndNew = new EventEmitter<Boolean>();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private messages: MessagesService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // INIT FORM depending of edit or not mode
  private initForm() {
    this.accountForm = this.fb.group(
      {
        name: ['', Validators.required],
        siret: ['', Validators.required],
        address: ['', Validators.required],
        zip_code: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        phone: ['', Validators.required],
        fax: ['', Validators.required],
        activity: ['55', Validators.required],
        activity_code: ['', Validators.required],
        vat_number: ['', Validators.required]
      });
    this.loading = false;
  }

  onCancel() {
    this.open = !this.open;
    this.cancel.emit(true);
  }

  get pickActivitiesLabel() {
    return this.pickActivities.value || '-Aucun-';
  }

  onAddAccount() {
    this.accountService.addAccount(this.accountForm.value);
  }

  onAddAccountAndNew() {
    this.accountService.addAccount(this.accountForm.value);
    this.accountForm.setValue(
      {
        name: '',
        siret: '',
        address: '',
        zip_code: '',
        city: '',
        country: '',
        phone: '',
        fax: '',
        activity: '',
        activity_code: '',
        vat_number: ''
      });
    this.saveAndNew.emit(true);

  }
}
