import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proceedings-detail',
  templateUrl: './proceedings-detail.component.html',
  styleUrls: ['./proceedings-detail.component.scss']
})
export class ProceedingsDetailComponent implements OnInit {
  stepActions = false;
  expandedStep = false;

  constructor() { }

  ngOnInit() {
  }

  onToggleStepActions($event: Event) {
    $event.stopPropagation();
    this.stepActions = true;
  }

  onExpandStep(){
    this.expandedStep = !this.expandedStep;
  }

}
