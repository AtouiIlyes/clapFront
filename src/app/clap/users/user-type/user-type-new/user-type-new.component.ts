import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserTypesService } from '../user-types.service';
import { MessagesService } from '#shared/messages/messages.service';

@Component({
  selector: 'app-user-type-new',
  templateUrl: './user-type-new.component.html',
  styleUrls: ['./user-type-new.component.scss']
})
export class UserTypeNewComponent implements OnInit {
  id: number;
  editMode = false;
  loading = true;
  userTypeForm: FormGroup;
  userTypeSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userTypesService: UserTypesService,
    private messages: MessagesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.editMode = (param['id'] != null);

        this.initForm();
      }
    );
  }
  // INIT FORM depending of edit or not mode
  private initForm() {
    this.userTypeForm = this.fb.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
      });
    if (this.editMode) {

      this.userTypesService.getUserType(this.id).subscribe(res => {
        this.userTypeForm = this.fb.group({
          name: res.name,
          description: res.description
        });
      }, error => {
        this.messages.error('ERREUR SERVEUR', 'Impossible de charger les données de type de l\'utilisateur : ' + error);
      }
      );
    }
    this.loading = false;
  }


  onAddUserType() {
    this.userTypesService.addUserType(this.userTypeForm.value);
    this.userTypeSubscription = this.userTypesService.getTypeUserRefreshList().subscribe(
      data => this.router.navigate(['/types'])
    );
  }


  onUpdateUserType() {
    this.userTypesService.updateUserType(this.id, this.userTypeForm.value);
    this.userTypeSubscription = this.userTypesService.getTypeUserRefreshList().subscribe(
      data => this.router.navigate(['/types'])
    );
  }

  onCancel() {
    this.router.navigate(['/types']);
  }


}
