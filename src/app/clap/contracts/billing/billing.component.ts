import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { ContractService } from '../contracts.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnChanges {

  billingForm: FormGroup;
  contractsList = [];
  user = [];
  billingFormErrors = [];
  submitted = false;
  loading = true;
  pickedContract: string = '';

  pickBillingTypes: any = [];
  openBillingTypesPickList = false;
  billingType = '';
  billingTypes = [
    { value: 'Au forfait', id: '1' },
    { value: 'Au dossier', id: '2' },
    { value: 'A l\'action', id: '3' },
    { value: 'A l\'honoraire', id: '4' },
  ];



  @Input() open: boolean;
  @Input() billingId: number;
  @Output() cancel = new EventEmitter<Boolean>();
  @Output() saveAndNew = new EventEmitter<Boolean>();

  constructor(
    private contractService: ContractService,
    private fb: FormBuilder) { }

  ngOnChanges() {
    this.contractService.getContracts().subscribe(contracts => {
      this.contractsList = contracts;
    })
    this.initForm();
  }

  private initForm() {
    this.user = JSON.parse(localStorage.getItem('currentUserData'));
    this.billingForm = this.fb.group(
      {
        contract_id: ['', Validators.required],
        billing_type: ['', Validators.required]
      });
    this.loading = false;

  }
  onAddBillingAccount() {
    // stop here if form is invalid
    if (this.billingForm.invalid) {
      this.getFormValidationErrors();
      this.submitted = true;
      console.log(this.billingForm.value);

    } else {
      console.log(this.billingForm.value);
    }
  }

  onCancel() {
    this.open = !this.open;
    this.cancel.emit(true);
  }

  //get unvalidated field names
  getFormValidationErrors() {
    Object.keys(this.billingForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.billingForm.get(key).errors;
      if (controlErrors != null) {
        let keyName = '';
        Object.keys(controlErrors).forEach(keyError => {
          switch (key) {
            case 'contract_id':
              keyName = 'Nom du contrat';
              break;
            case 'billing_id':
              keyName = 'Type de Facturation';
              break;
            case 'folder_volume':
              keyName = 'Volue du dossiers';
              break;
            default:
          }
          this.billingFormErrors.push(keyName);
        });
        this.billingFormErrors.join(", ");
      }
    });
  }

  get billingFormValidators() {
    return this.billingForm.controls;
  }

  lookupContracts = (query: string, source = this.contractsList) => {
    let temp = [];
    if (!query) {
      temp = source;
    } else {
      temp = source.filter(contract => contract.name.indexOf(query.toLowerCase()) > -1);
    }
    return temp;
  }

  contractPicked(pickedContract) {
    if (pickedContract) {
      this.pickedContract = pickedContract.name;
      this.billingForm.patchValue({ contract_id: pickedContract.id });
      console.log(this.billingForm.value);
    } else {
      this.pickedContract = null;
    }
  }

  get pickBillingTypesLabel() {
    return this.pickBillingTypes.value || '-Aucun-';
  }

  billingPicked(billingPicked) {
    console.log(billingPicked);
    this.billingType = billingPicked.id;
    this.billingForm.patchValue({ billing_type: billingPicked.id });
    switch (this.billingType) {
      case '1':
        this.billingForm = this.fb.group(
          {
            contract_id: ['', Validators.required],
            billing_type: [this.billingType, Validators.required],
            folder_volume: ['', Validators.required],
            fixed_rate: ['', Validators.required],
          });
        break;
      case '2':
        this.billingForm = this.fb.group(
          {
            contract_id: ['', Validators.required],
            billing_type: [this.billingType, Validators.required],
            rate_per_folder: ['', Validators.required],
            share_on_cashing: ['', Validators.required],
          });
        break;
      case '3':
        this.billingForm = this.fb.group(
          {
            contract_id: ['', Validators.required],
            billing_type: [this.billingType, Validators.required],
            outgoing_call: ['', Validators.required],
            sms: ['', Validators.required],
          });
        break;
      case '4':
        this.billingForm = this.fb.group(
          {
            contract_id: ['', Validators.required],
            billing_type: [this.billingType, Validators.required],
            cashing: ['', Validators.required],
            legal_fees: ['', Validators.required],
            court_fees: ['', Validators.required],
            added_fees: ['', Validators.required],
          });
        break;
      default:
    }
    console.log(this.billingForm.value);
  }

}
