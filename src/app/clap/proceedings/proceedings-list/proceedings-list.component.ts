import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proceedings-list',
  templateUrl: './proceedings-list.component.html',
  styleUrls: ['./proceedings-list.component.scss']
})
export class ProceedingsListComponent implements OnInit {

  editMode = false;
  openProcessEditModal = false;
  constructor() { }

  ngOnInit() {
  }

  onEditProcess(id) {
    this.openProcessEditModal = true;
  }

  onDeleteCancel() {
    this.openProcessEditModal = false;
  }

  onDeleteCancelEditModal() {
    this.openProcessEditModal = false;
  }


}
