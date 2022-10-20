import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddEmployeesComponent} from './components/add-employees/add-employees.component'
import { EmployeesRoutingModule } from './employees-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule,    SharedModule } from '@coreui/angular';
import {FormlyModule} from '@ngx-formly/core'
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component'
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  declarations: [
    AddEmployeesComponent,
    AllEmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    TableModule,
    SharedModule,
    PaginatorModule,
  
    FormlyBootstrapModule ,
 
    FormlyModule.forRoot({
      validationMessages: [
        {name: 'required', message: 'This field is required'},
      ],
    }),
  
  
  ]
})
export class EmployeesModule { }
