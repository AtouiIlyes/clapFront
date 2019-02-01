import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UsersService } from '../users.service';
import { MessagesService } from '../../../shared/messages/messages.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  id: number;
  editMode = false;
  userForm: FormGroup;
  userSubscription: Subscription;
  openRolePickList = false;
  openUserTypePickList = false;
  multipleRolesSelection = false;
  multipleUserTypeSelection = false;
  pickRole: any = [];
  pickUserType: any = [];
  roles = [];
  userTypes = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private messages: MessagesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.editMode = (param['id'] != null);
        this.userService.getRoles().subscribe(roles => {
          this.roles = roles;
        });

        this.userService.getUserTypes().subscribe(userTypes => {
          this.userTypes = userTypes;
        });
        this.initForm();
      }
    );
  }
  // INIT FORM depending of edit or not mode
  private initForm() {
    this.userForm = this.fb.group(
      {
        email: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        function: ['', Validators.required],
        address_one: ['', Validators.required],
        address_two: ['', Validators.required],
        phone: ['', Validators.required],
        fax: ['', Validators.required],
        city: ['', Validators.required],
        zip_code: ['', Validators.required],
        role_id: ['', Validators.required],
        type_id: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: this.matchingPasswords('password', 'confirmPassword')
      });

    if (this.editMode) {
      this.userService.getUserTypes().subscribe(userTypes => {
        this.userTypes = userTypes;
        this.userService.getRoles().subscribe(
          roles => {
            this.roles = roles;
            this.userService.getUser(this.id).subscribe(res => {
              const user = res;
              const userRole = this.roles.find(role => role.id === user.role_id);
              const userType = this.userTypes.find(type => type.id === user.type_id);
              this.pickRole = userRole;
              this.pickUserType = userType;
              this.userForm = this.fb.group({
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                function: user.function,
                address_one: user.address_one,
                address_two: user.address_two,
                phone: user.phone,
                fax: user.fax,
                city: user.city,
                role_id: userRole.id,
                type_id: userType.id,
                zip_code: user.zip_code
              });
            }, error => {
              this.messages.error('ERREUR SERVEUR', 'Impossible de charger les données de l\'utilisateur : ' + error);
            }
            );
          }
        );
      });

    }
  }

  // validate if password match confirmed password
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    };
  }

  onAddUser() {
    this.userForm.patchValue(
      {
        role_id: this.pickRole.id,
        type_id: this.pickUserType.id
      }
    ); this.userService.addUser(this.userForm.value);
    this.userSubscription = this.userService.getUserdded().subscribe(
      data => this.router.navigate(['/users'])
    );
  }


  onUpdateUser() {
    this.userForm.patchValue(
      {
        role_id: this.pickRole.id,
        type_id: this.pickUserType.id
      }
    );
    this.userService.updateUser(this.id, this.userForm.value);
    this.userSubscription = this.userService.getUserdded().subscribe(
      data => this.router.navigate(['/users'])
    );
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

  get pickRoleLabel() {
    return this.pickRole.name || 'Sélectionner un role';
  }

  get pickUserTypeLabel() {
    return this.pickUserType.name || 'Sélectionner un type';
  }

}
