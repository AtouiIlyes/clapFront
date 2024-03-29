import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessagesService } from '../../../shared/messages/messages.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  returnUrl: string;
  loading = false;
  loginForm: FormGroup;


  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private message: MessagesService
              ) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/homes';
  }

  login() {
    this.loading = true;
    this.authService.login(this.loginForm.value)
      .subscribe(
        data => {
          // this.router.navigate([this.returnUrl]);
          this.router.navigate(['homes']);
        },
        error => {
          this.message.error('ECHEC CONNEXION', 'Les informations fournies ne permettent pas de vous connecter à l\'application. Merci de réessayer');
        });

  }
}
