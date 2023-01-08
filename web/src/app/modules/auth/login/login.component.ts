import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HTTPResponseStatus, User } from 'src/app/model/auth';
import { AuthActionTypes, LogIn } from '../../../store/actions/auth.action';
import { loginFormlyFields } from './login-user.formly';
import {
  AuthState,
  selectAuthState,
} from 'src/app/store/selector/auth.selector';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  subscriptions = new Subscription();
  loginForm = new FormGroup({});
  model: any = {};
  userModel: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  user: User;

  getState: Observable<any>;
  errorMessage: string | null;
  submitting: false;
  constructor(
     private store: Store<AuthState>,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.fields = loginFormlyFields;
  }

  HTTPResponseMessage: {
    type: HTTPResponseStatus;
    title: string;
    message: string;
  };
  HTTPResponseStatus = HTTPResponseStatus;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  login() {
    this.user = this.loginForm.value;
    const user = {...this.loginForm.value};
     this.store.dispatch(new LogIn(user));

     
    // this.authservice.login(user).subscribe({
    //   next: (res) => {
    //     this.submitting = false;
    //     this.HTTPResponseMessage = {
    //       type: HTTPResponseStatus.SUCCESS,
    //       title: 'Success',
    //       message:
    //         'You have successfully logged in, please wait as we redirect you',
    //     };
    //   },
    //   error: (err) => {
    //     this.submitting = false;
    //     this.HTTPResponseMessage = {
    //       type: HTTPResponseStatus.ERROR,
    //       title: `We couldn't sign you in`,
    //       message: err?.error?.message ? err?.error?.message : 'There was an error when trying to log you in, please try again'
    //     };
    //   } 
    // });
  
    this.loginForm.reset();
    console.log(user);
  }
}
