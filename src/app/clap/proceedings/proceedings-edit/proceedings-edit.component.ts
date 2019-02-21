import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-proceedings-edit',
  templateUrl: './proceedings-edit.component.html',
  styleUrls: ['./proceedings-edit.component.scss']
})
export class ProceedingsEditComponent implements OnChanges {

  processFormErrors = [];
  loading = true;
  submitted = false;
  processForm: FormGroup;


  @Input() open: boolean;
  @Input() accountId: number;
  @Output() cancel = new EventEmitter<Boolean>();

  constructor(private fb: FormBuilder) { }

  ngOnChanges() {
    this.initForm();
  }

  private initForm() {
    this.processForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      libelle: ['', Validators.required]
    });

    this.loading = false;
  }

  get processFormValidators() { return this.processForm.controls; }

  onAddProcess() {
    // stop here if form is invalid
    if (this.processForm.invalid) {
      this.getFormValidationErrors();
      this.submitted = true;

    } else {
      console.log(this.processForm.value);
    }
  }

  getFormValidationErrors() {
    Object.keys(this.processForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.processForm.get(key).errors;
      if (controlErrors != null) {
        let keyName = '';
        Object.keys(controlErrors).forEach(keyError => {
          switch (key) {
            case 'code':
              keyName = 'Code Procédure';
              break;
            case 'libelle':
              keyName = 'Libelle Procédure';
              break;
            default:
          }
          this.processFormErrors.push(keyName);
        });
        this.processFormErrors.join(", ");
      }
    });
  }

  onCancel() {
    this.open = !this.open;
    this.cancel.emit(true);
  }
}
