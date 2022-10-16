import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/auth';
import { LogIn } from 'src/app/store/actions/auth.action';
import { AppState, selectAuthState } from 'src/app/store/state/appState';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:User

  getState: Observable<any>;
  errorMessage: string | null;

  constructor(   private store: Store<AppState>) {
      this.getState = this.store.select(selectAuthState);
     }

     ngOnInit() {
      this.getState.subscribe((state) => {
        this.errorMessage = state.errorMessage;
      });
    };


    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    onSubmit(): void {
      console.log(this.loginForm.value)
      this.store.dispatch(new LogIn(this.loginForm.value));
    }
}
