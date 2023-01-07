import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/auth';
import { AuthActionTypes, LogIn } from '../../../store/actions/auth.action'
import {loginFormlyFields} from './login-user.formly'
import { AuthState, selectAuthState } from 'src/app/store/selector/auth.selector';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  subscriptions = new Subscription()
  loginForm = new FormGroup({});
  model: any = {};
  userModel: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  user:User

  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
     private store: Store<AuthState>,
    private router: Router,
    ) {}

     ngOnInit() {
      this.fields =loginFormlyFields

     
    };

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
       
     }

    login(){
      this.user =this.loginForm.value
      const user:User={...this.loginForm.value}
      this.store.dispatch(new LogIn(user));
      this.router.navigateByUrl('/dashboard')
      this.loginForm.reset()
      console.log(user)

    }

   
}
