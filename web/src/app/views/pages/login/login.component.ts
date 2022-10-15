import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/model/auth';
import { LogIn } from 'src/app/store/actions/auth.action';
import { AppState } from 'src/app/store/state/appState';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   user:User
  constructor(  
    private store: Store<AppState>
    ) { }

    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    onSubmit(): void {
      console.log(this.loginForm.value)
      this.store.dispatch(new LogIn(this.loginForm.value));
    }
  
}
