import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import{registerFormlyFields} from "src/app/modules/auth/register/register.formly"
@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit {
  subscriptions = new Subscription();
  registerForm = new FormGroup({});

  userModel: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  user: User;

  getState: Observable<any>;
  errorMessage: string | null;
  submitting: false;
  constructor(
    private  authservice:AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.fields = registerFormlyFields;
  }
   registerUser(){
    const userDetails={
      ...this.userModel
    }
    this.subscriptions.add(
      this.authservice.register(userDetails).subscribe({
        next:(res)=>{
        this.router.navigateByUrl("/auth/login")
        }

      })
    )
   }

}
