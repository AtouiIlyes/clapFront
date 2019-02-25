import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { AuthService } from '#app/core/auth/auth.service';
import { MessagesService } from '#app/shared/messages/messages.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnChanges {

  pickTypes: any = [];
  openTypePickList = false;
  id: number;
  editMode = false;
  loading = true;
  submitted = false;
  contactForm: FormGroup;
  contactFormErrors = [];
  user = [];
  pickedType: string = '';
  types = [
    { value: 'opérationnel', id: '1' },
    { value: 'Facturation', id: '2' },
  ];


  @Input() open: boolean;
  @Input() contactId: number;
  @Output() cancel = new EventEmitter<Boolean>();
  @Output() saveAndNew = new EventEmitter<Boolean>();


  constructor(
    private contactService: ContactsService,
    private auth: AuthService,
    private messages: MessagesService,
    private fb: FormBuilder) { }

  ngOnChanges() {

    this.initForm();
  }

  // INIT FORM depending of edit or not mode
  private initForm() {
    this.user = JSON.parse(localStorage.getItem('currentUserData'));
    if (this.user) {
      this.contactForm = this.fb.group(
        {
          first_name: ['', [Validators.required, Validators.minLength(3)]],
          last_name: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
          address_one: ['', Validators.required],
          address_two: ['', Validators.required],
          type_id: ['', Validators.required],
          function: ['', Validators.required],
          zip_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
          city: ['', Validators.required],
          phone: ['', [Validators.required, Validators.pattern(/^[33|0]{1}[6|7|9]{1}\d{8}$/)]],
          fax: ['', [Validators.required, Validators.pattern(/^[33|0]{1}[6|7|9]{1}\d{8}$/)]],
        });
      if (this.contactId) {
        this.contactService.getContact(this.contactId).subscribe(contact => {
          this.contactForm = this.fb.group(
            {
              first_name: contact.first_name,
              last_name: contact.last_name,
              email: contact.email,
              address_one: contact.address_one,
              address_two: contact.address_two,
              role_id: contact.role_id,
              type_id: contact.type_id,
              function: contact.function,
              zip_code: contact.zip_code,
              city: contact.city,
              phone: contact.phone,
              fax: contact.fax,
            });
        });

      }
      this.loading = false;
    }
  };


  get pickTypesLabel() {
    return this.pickTypes.value || '-Aucun-';
  }

  onAddContact() {

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      this.getFormValidationErrors();
      this.submitted = true;

    } else {
      console.log(this.contactForm.value);
      //this.contactService.addContact(this.contactForm.value);
    }
  }

  onCancel() {
    this.open = !this.open;
    this.cancel.emit(true);
  }

  onAddContractAndNew() {
    this.contactService.addContact(this.contactForm.value);
    this.contactForm.setValue(
      {
        first_name: '',
        last_name: '',
        email: '',
        address_one: '',
        address_two: '',
        type_id: '',
        function: '',
        zip_code: '',
        city: '',
        phone: '',
        fax: '',
      });
    this.saveAndNew.emit(true);

  }

  //get unvalidated field names
  getFormValidationErrors() {
    Object.keys(this.contactForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.contactForm.get(key).errors;
      if (controlErrors != null) {
        let keyName = '';
        Object.keys(controlErrors).forEach(keyError => {
          switch (key) {
            case 'first_name':
              keyName = 'Nom';
              break;
            case 'last_name':
              keyName = 'Prénom';
              break;
            case 'address_one':
              keyName = 'Adresse siége social';
              break;
            case 'address_two':
              keyName = 'Adresse 2';
              break;
            case 'function':
              keyName = 'Fonction';
              break;
            case 'role_id':
              keyName = 'Role';
              break;
            case 'type_id':
              keyName = 'Type';
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
            case 'email':
              keyName = 'Email';
              break;
            default:
          }
          this.contactFormErrors.push(keyName);
        });
        this.contactFormErrors.join(", ");
      }
    });
  }
  get contactFormValidators() { return this.contactForm.controls; }



  typePicked(pickedType) {
    if (pickedType) {
      this.pickedType = pickedType.value;
      this.contactForm.patchValue({ type_id: pickedType.id });
    } else {
      this.pickedType = null;
    }
  }

}
