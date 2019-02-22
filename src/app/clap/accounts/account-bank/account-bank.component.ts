import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-account-bank',
  templateUrl: './account-bank.component.html',
  styleUrls: ['./account-bank.component.scss']
})
export class AccountBankComponent implements OnChanges {

  bankAccountForm: FormGroup;
  accountsList = [];
  bankAccountFormErrors = [];
  submitted = false;
  loading = true;
  pickedAccount: string = '';


  @Input() open: boolean;
  @Input() bankAccountId: number;
  @Output() cancel = new EventEmitter<Boolean>();
  @Output() saveAndNew = new EventEmitter<Boolean>();

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder) { }

  ngOnChanges() {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accountsList = accounts;
    })
    this.initForm();
  }

  private initForm() {
    this.bankAccountForm = this.fb.group(
      {
        bankName: ['', [Validators.required, Validators.minLength(3)]],
        client_id: ['', Validators.required],
        iban: ['', Validators.required],
        bic: ['', Validators.required],
        swift: ['', Validators.required],
        address: ['', Validators.required],
        address2: ['', Validators.required],
        zip_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        city: ['', Validators.required],
        country: ['', Validators.required],
      });
    this.loading = false;

  }
  onAddBankAccount() {
    // stop here if form is invalid
    if (this.bankAccountForm.invalid) {
      this.getFormValidationErrors();
      this.submitted = true;

    } else {
      console.log(this.bankAccountForm.value);
    }
  }

  onCancel() {
    this.open = !this.open;
    this.cancel.emit(true);
  }

  //get unvalidated field names
  getFormValidationErrors() {
    Object.keys(this.bankAccountForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.bankAccountForm.get(key).errors;
      if (controlErrors != null) {
        let keyName = '';
        Object.keys(controlErrors).forEach(keyError => {
          switch (key) {
            case 'accountName':
              keyName = 'Nom du compte';
              break;
            case 'bankName':
              keyName = 'Nom du Banque';
              break;
            case 'iban':
              keyName = 'IBAN';
              break;
            case 'bic':
              keyName = 'BIC';
              break;
            case 'swift':
              keyName = 'SWIFT';
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
            default:
          }
          this.bankAccountFormErrors.push(keyName);
        });
        this.bankAccountFormErrors.join(", ");
      }
    });
  }

  get bankAccountFormValidators() {
    return this.bankAccountForm.controls;
  }

  lookupAccounts = (query: string, source = this.accountsList) => {
    let temp = [];
    if (!query) {
      temp = source;
    } else {
      temp = source.filter(account => account.name.indexOf(query.toLowerCase()) > -1 || account.name.indexOf(query.toLowerCase()) > -1);
    }
    return temp;
  }

  accountPicked(pickedAccount) {
    if (pickedAccount) {
      this.pickedAccount = pickedAccount.name;
      this.bankAccountForm.patchValue({ client_id: pickedAccount.id });
    } else {
      this.pickedAccount = null;
    }
  }


}
