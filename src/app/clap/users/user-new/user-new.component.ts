import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { UsersService } from '../users.service';
import { MessagesService } from "../../../shared/messages/messages.service";

@Component({
    selector: 'app-user-new',
    templateUrl: './user-new.component.html',
    styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
    id: number;
    editMode = false;
    userForm: FormGroup;
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
                this.id = +param['id']; // + to convert to number
                this.editMode = (param['id'] != null);
                this.initForm();
            }
        )
    }

    // INIT FORM depending of edit or not mode
    private initForm() {
        if (this.editMode) {
            this.userService.getUser(this.id).subscribe(res => {
                const user = res;
                this.userForm.setValue({
                    email: user.email,
                });
                this.editMode = true;
            }, error => {
                this.messages.error('ERREUR SERVEUR', 'Impossible de charger les données de l\'utilisateur : ' + error);
            }
            );
            this.userForm = this.fb.group({
                email: ['', Validators.required],
            });
        } else {
            this.userForm = this.fb.group(
                {
                    email: ['', Validators.required],
                    password: ['', Validators.required],
                    confirmPassword: ['', Validators.required]
                },
                {
                    validator: this.matchingPasswords('password', 'confirmPassword')
                });
        }
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

    onAddUser() {
        this.userService.addUser(this.userForm.value);
        this.router.navigate(['/users']);
    }

    onUpdateUser() {
        this.userService.updateUser(this.id, this.userForm.value);
        this.router.navigate(['/users']);
    }
    
    onCancel() {
        this.router.navigate(['/users']);
    }

}
