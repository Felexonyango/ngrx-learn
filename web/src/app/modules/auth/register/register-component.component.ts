import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/auth';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit {
  subscriptions = new Subscription();
  registerForm = new FormGroup({});
  model: any = {};
  userModel: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  user: User;

  getState: Observable<any>;
  errorMessage: string | null;
  submitting: false;
  constructor() { }

  ngOnInit(): void {
  }

}
