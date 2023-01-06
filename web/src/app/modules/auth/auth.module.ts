import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent} from './login/login.component'
import { AuthRoutingModule } from './auth-routing.module';
import {  CardModule, FormModule, GridModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    FormlyBootstrapModule ,
    FormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        {name: 'required', message: 'This field is required'},
      ],
    }),
   
    
  ]
  
})
export class AuthModule { }
