import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
export function minlengthValidationMessages(err, field) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}
export function fieldMatchValidator(control: AbstractControl) {
  
  const { password, passwordConfirm } = control.value;
  // avoid displaying the message error when values are empty
  if (!passwordConfirm || !password) {
    return null;
  }
  if (passwordConfirm === password) {
    return null;
  }
  return { fieldMatch: { message: "Those passwords didn't match. Try Again" } };
}
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    LoginGoogleComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
        validators: [{ name: 'fieldMatch', validation: fieldMatchValidator }],
        validationMessages: [
          { name: 'required', message: 'This field is required' },
          { name: 'minlength', message: minlengthValidationMessages },
        ],
        extras: { lazyRender: true }
      }),
    FormlyPrimeNGModule,
    TableModule,
    ButtonModule,
    MessagesModule,
    MessageModule
  ],
})
export class AuthenticationModule {}

