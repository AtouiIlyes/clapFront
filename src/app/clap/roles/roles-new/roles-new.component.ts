import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, ValidatorFn, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { RolesService } from '../roles.service';
import { Role } from '../role.model';

@Component({
  selector: 'app-roles-new',
  templateUrl: './roles-new.component.html',
  styleUrls: ['./roles-new.component.scss']
})
export class RolesNewComponent implements OnInit {
  id: number;
  editMode = false;
  loading = true;
  roleForm: FormGroup;
  roleSubscription: Subscription;
  permissions = [];
  role: {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rolesService: RolesService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.editMode = (param['id'] != null);
      }
    );

    this.roleSubscription = this.rolesService.getRefreshList().subscribe(
      data => this.router.navigate(['/roles'])
    );

    this.initForm();
  }


  // checkbox management inspired by : https://coryrylan.com/blog/creating-a-dynamic-checkbox-list-in-angular
  private initForm() {
    this.rolesService.getPermissions().subscribe(res => {
      this.permissions = res;

      let controls = this.permissions.map(permission => new FormControl(false));

      this.roleForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        permission_ids: new FormArray(controls, this.minSelectedCheckboxes(1))
      });

      if (this.editMode) {
        this.rolesService.getRole(this.id).subscribe(role => {

          this.role = role;

          const perms = role.permissions;
          controls = this.permissions.map((permission) =>
            perms.filter(e => e.id === permission.id).length > 0 ? new FormControl(true) : new FormControl(false)
          );

          this.roleForm = this.fb.group({
            name: [role.name, Validators.required],
            description: [role.description, Validators.required],
            permission_ids: new FormArray(controls, this.minSelectedCheckboxes(1))
          });

          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
  }


  onSubmitRole() {
    // get a list of selected permissions
    const selectedPermissionsIds = this.roleForm.value.permission_ids
      .map((v, i) => v ? this.permissions[i].id : null)
      .filter(v => v !== null);
    this.roleForm.setControl('permission_ids', this.fb.array(selectedPermissionsIds));

    if (this.editMode) {
      this.rolesService.updateRole(this.id, this.roleForm.value);
    } else {
      this.rolesService.addRole(this.roleForm.value);
    }
  }

  onCancel() {
    this.router.navigate(['/roles']);
  }

  // validate that at leat one checkox is checked
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }
}
