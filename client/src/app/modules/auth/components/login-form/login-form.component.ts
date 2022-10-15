import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { LogIn } from 'src/app/store/actions/auth.action';
import { AppState } from 'src/app/store/state/appState';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  // @Output() sendLoginForm = new EventEmitter<void>();
  public form: FormGroup;
user:User
  constructor(

    private store: Store<AppState>
  ){


  }
   ngOnInit(): void {
    // this.form = new FormGroup({
    //   email: new FormControl(this.flatlogicEmail, [
    //     Validators.required,
    //     Validators.email,
    //   ]),
    //   password: new FormControl(this.flatlogicPassword, [Validators.required]),
    // });
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    
    this.store.dispatch(new LogIn(payload));
  }

}
