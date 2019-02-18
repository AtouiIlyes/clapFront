import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ContractService } from '../contracts.service';
import { MessagesService } from '#shared/messages/messages.service';
@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss']
})
export class ContractEditComponent implements OnChanges {

  pickActivities: any = [];
  accounts: any = [];
  sales_users: any = [];
  manager_users: any = [];
  openActivityPickList = false;
  clientMode = false;
  id: number;
  loading = false;
  submitted = false;
  contractForm: FormGroup;
  contractFormErrors = [];
  pickedAccount: string = '';
  pickedSalesUser: string = '';
  pickedManagerUser: string = '';
  pickedStatisticUser: string = '';
  accountSubscription: Subscription;


  activities = [
    { value: 'Item 1', icon: 'kanban' },
    { value: 'Item 2', icon: 'side_list' },
    { value: 'Item 3', icon: 'table' },
  ];


  @Input() open: boolean;
  @Input() contractId: number;
  @Input() clientId: number;
  @Output() cancel = new EventEmitter<Boolean>();
  @Output() saveAndNew = new EventEmitter<Boolean>();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private messages: MessagesService,
    private fb: FormBuilder) { }

  ngOnChanges() {
    this.initForm();
  }

  // INIT FORM depending of edit or not mode
  private initForm() {
    this.contractForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', Validators.required],
        client_id: ['', Validators.required],
        sales_person_id: ['', Validators.required],
        manager_id: ['', Validators.required]
      });
    this.contractService.getUsers().subscribe(users => {

      this.sales_users = users;
      this.manager_users = users;
      if (this.clientId) {
        if (this.contractId) {
          this.contractService.getContract(this.clientId, this.contractId).subscribe(contract => {
            this.contractForm = this.fb.group(
              {
                name: contract.name,
                description: 'dd', //contract.description'',
                client_id: 3, //contract.client_id,
                sales_person_id: 4, //contract.sales_person_id,
                manager_id: 5, //contract.manager_id
              });

            const pickedSalesUser = this.sales_users.find(salesUser => salesUser.id = contract.sales_person_id);
            const pickedManagerUser = this.manager_users.find(managerUser => managerUser.id = contract.manager_id);

            this.pickedSalesUser = 'ilyes atoui';
            this.pickedManagerUser = 'wafa nahdi';

          });

        }
        this.clientMode = true;
        this.contractService.getAccount(this.clientId).subscribe(account => {
          this.accounts = account;
          this.pickedAccount = account.name;
          this.contractForm.patchValue({
            client_id: account.id
          })
        })
      } else {
        this.contractService.getAccounts().subscribe(accounts => {
          this.accounts = accounts;
        })

      }
      this.loading = true;

    })


  }
  get pickActivitiesLabel() {
    return this.pickActivities.value || '-Aucun-';
  }
  onAddContract() {
    // stop here if form is invalid
    if (this.contractForm.invalid) {
      this.getFormValidationErrors();
      this.submitted = true;

    } else {
      this.submitted = false;
      this.contractService.addContract(this.clientId, this.contractForm.value);
      this.accountSubscription = this.contractService.getContractsRefreshList().subscribe(data => {
        if (data) {
          this.open = !this.open;
          this.cancel.emit(true);
        }
      })
    }
  }

  onEditContract() {
    // stop here if form is invalid
    if (this.contractForm.invalid) {
      this.getFormValidationErrors();
      this.submitted = true;

    } else {
      this.submitted = false;
      this.contractService.updateContract(this.clientId, this.contractId, this.contractForm.value);
      this.accountSubscription = this.contractService.getContractsRefreshList().subscribe(data => {
        if (data) {
          this.open = !this.open;
          this.cancel.emit(true);
        }
      })

    }
  }


  onCancel() {
    this.open = !this.open;
    this.submitted = false;
    this.contractFormErrors = [];
    this.cancel.emit(true);
  }

  onAddContractAndNew() {
    this.contractService.addContract(this.clientId, this.contractForm.value);
    this.contractForm.setValue(
      {
        name: '',
        description: '',
        client_id: '',
        sales_person_id: '',
        manager_id: '',
      });
    this.saveAndNew.emit(true);

  }

  //get unvalidated field names
  getFormValidationErrors() {
    Object.keys(this.contractForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.contractForm.get(key).errors;
      if (controlErrors != null) {
        let keyName = '';
        Object.keys(controlErrors).forEach(keyError => {
          switch (key) {
            case 'name':
              keyName = 'Nom du contrat';
              break;
            case 'description':
              keyName = 'Description';
              break;
            case 'client_id':
              keyName = 'Nom du compte';
              break;
            case 'sales_person_id':
              keyName = 'Commercial en charge';
              break;
            case 'manager_id':
              keyName = 'Gestionnaire de dossier';
              break;
            default:
          }
          this.contractFormErrors.push(keyName);
        });
        this.contractFormErrors.join(", ");
      }
    });
  }
  get contractFormValidators() { return this.contractForm.controls; }

  lookupAccounts = (query: string, source = this.accounts) => {
    let temp = [];
    if (!query) {
      temp = source;
    } else {
      temp = source.filter(account => account.name.indexOf(query.toLowerCase()) > -1 || account.name.indexOf(query.toLowerCase()) > -1);
    }
    return temp;
  }

  lookupSalesUsers = (query: string, source = this.sales_users) => {
    let temp = [];
    if (!query) {
      temp = source;
    } else {
      temp = source.filter(user => user.first_name.indexOf(query.toLowerCase()) > -1 || user.last_name.indexOf(query.toLowerCase()) > -1);
    }
    return temp;
  }

  lookupManagerUsers = (query: string, source = this.manager_users): any[] => {
    let temp = [];
    if (!query) {
      temp = source;
    } else {
      temp = source.filter(user => user.first_name.indexOf(query.toLowerCase()) > -1 || user.last_name.indexOf(query.toLowerCase()) > -1);
    }
    return temp;
  }

  managerUserPicked(managerUserPicked) {
    if (managerUserPicked) {
      this.pickedManagerUser = managerUserPicked.first_name + ' ' + managerUserPicked.last_name;
      this.contractForm.patchValue({ manager_id: managerUserPicked.id });
    } else {
      this.pickedManagerUser = null;
    }
  }

  SalesUserPicked(pickedSalesUser) {
    if (pickedSalesUser) {
      this.pickedSalesUser = pickedSalesUser.first_name + ' ' + pickedSalesUser.last_name;
      this.contractForm.patchValue({ sales_person_id: pickedSalesUser.id });
    } else {
      this.pickedSalesUser = null;
    }
  }

  accountPicked(pickedAccount) {
    if (pickedAccount) {
      this.pickedAccount = pickedAccount.name;
      this.contractForm.patchValue({ client_id: pickedAccount.id });
    } else {
      this.pickedAccount = null;
    }
  }
}
