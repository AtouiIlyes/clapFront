import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-proceedings-step',
  templateUrl: './proceedings-step.component.html',
  styleUrls: ['./proceedings-step.component.scss']
})
export class ProceedingsStepComponent implements OnInit {

  pickSteps: any = [];
  pickRanks: any = [];
  openStepPickList = false;
  openRankPickList = false;
  editMode = false;
  stepForm: FormGroup;
  steps = [
    { value: 'Courrier postal', id: '1' },
    { value: 'Appel téléphonique', id: '2' },
    { value: 'Envoi SMS', id: '3' },
    { value: 'Envoi Email', id: '4' },
  ];
  ranks = [
    { value: '1', id: '1' },
    { value: '2', id: '2' },
    { value: '3', id: '3' },
    { value: '4', id: '4' },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();

  }

  private initForm() {
    this.stepForm = this.fb.group(
      {
        type: ['', Validators.required],
        name: ['', Validators.required],
        description: ['', Validators.required],
        send: ['', Validators.required],
        numberOfDays: ['', Validators.required],
        rank: ['', Validators.required],
      });

  }

  onAddStep() {
    console.log(this.stepForm.value);
  }

  get pickStepsLabel() {
    return this.pickSteps.value || '-Séléctionner une option-';
  }

  get pickRanksLabel() {
    return this.pickRanks.value || '-Séléctionner la position-';
  }

  stepPicked(stepPicked) {
    this.stepForm.patchValue({ type: stepPicked.id });
  }

  rankPicked(rankPicked) {
    this.stepForm.patchValue({ rank: rankPicked.id });
  }
}
