import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, ValidationErrors, FormBuilder } from '@angular/forms';

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
  submitted = false;
  accountForm: FormGroup;
  accountFormErrors = [];
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
        name: ['', [Validators.required, Validators.minLength(3)]],
        siret: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
        address: ['', Validators.required],
        zip_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        city: ['', Validators.required],
        country: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^[33|0]{1}[6|7|9]{1}\d{8}$/)]],
        fax: ['', [Validators.required, Validators.pattern(/^[33|0]{1}[6|7|9]{1}\d{8}$/)]],
        activity: ['55', Validators.required],
        activity_code: ['', Validators.required],
        vat_number: ['', [Validators.required, Validators.pattern(/^\d{4}[a-zA-Z]{1}$/)]]
      });
    this.loading = false;
  }


  get pickActivitiesLabel() {
    return this.pickActivities.value || '-Aucun-';
  }

  onAddAccount() {
    // stop here if form is invalid
    if (this.accountForm.invalid) {
      this.getFormValidationErrors();
      this.submitted = true;

    } else {
      this.accountService.addAccount(this.accountForm.value);
    }
  }

  onCancel() {
    this.open = !this.open;
    this.cancel.emit(true);
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

  //get unvalidated field names
  getFormValidationErrors() {
    Object.keys(this.accountForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.accountForm.get(key).errors;
      if (controlErrors != null) {
        let keyName = '';
        Object.keys(controlErrors).forEach(keyError => {
          switch (key) {
            case 'name':
              keyName = 'Nom du compte';
              break;
            case 'siret':
              keyName = 'Numéro du Siret NAF';
              break;
            case 'address':
              keyName = 'Adresse siége social';
              break;
            case 'zip_code':
              keyName = 'Code postal';
              break;
            case 'city':
              keyName = 'Ville';
              break;
            case 'country':
              keyName = 'Pays';
              break;
            case 'phone':
              keyName = 'Téléphone';
              break;
            case 'fax':
              keyName = 'Fax';
              break;
            case 'vat_number':
              keyName = 'Code NAF';
              break;
            default:
          }
          this.accountFormErrors.push(keyName);
        });
        this.accountFormErrors.join(", ");
      }
    });
  }
  get accountFormValidators() { return this.accountForm.controls; }

}
