import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, ValidatorFn, FormBuilder } from '@angular/forms';

import { RolesService } from '../roles.service';
import { async } from 'q';

@Component({
    selector: 'app-roles-new',
    templateUrl: './roles-new.component.html',
    styleUrls: ['./roles-new.component.scss']
})
export class RolesNewComponent implements OnInit {
    id: number;
    editMode = false;
    loading = false;
    roleForm: FormGroup;
    permissions = [];
    selectedPermissionsIds = [];

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
        )

        this.initForm();


    }

    private initForm() {
        this.rolesService.getPermissions().subscribe(res => {
            this.permissions = res;

            const controls = this.permissions.map(permission => new FormControl(false));

            this.roleForm = this.fb.group({
                name: ['', Validators.required],
                description: ['', Validators.required],
                permission_ids: new FormArray(controls, this.minSelectedCheckboxes(1))
            });

            if (this.editMode) {
                this.rolesService.getRole(this.id).subscribe(role => {
                    const perms = role.permissions;
                    const controls = this.permissions.map((permission) =>
                        perms.filter(e => e.id === permission.id).length > 0 ? new FormControl(true) : new FormControl(false)
                    );
                    this.roleForm.setValue({
                        name: role.name,
                        description: role.description,
                        permission_ids: controls
                    });
                    this.roleForm.setControl('permission_ids', new FormArray(controls));

                });
            }
            this.loading = true;

        });


    }



    onAddRole() {
        const selectedPermissionsIds = this.roleForm.value.permission_ids
            .map((v, i) => v ? this.permissions[i].id : null)
            .filter(v => v !== null);
        this.roleForm.setControl('permission_ids', this.fb.array(selectedPermissionsIds));
        this.rolesService.addRole(this.roleForm.value);
        this.router.navigate(['/roles']);
    }

    onUpdateRole() {
        const selectedPermissionsIds = this.roleForm.value.permission_ids
            .map((v, i) => v ? this.permissions[i].id : null)
            .filter(v => v !== null);
        this.roleForm.setControl('permission_ids', this.fb.array(selectedPermissionsIds));
        this.rolesService.updateRole(this.id, this.roleForm.value);
        this.router.navigate(['/roles']);
    }


    onCancel() {
        this.router.navigate(['/roles']);
    }


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
