import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddEmployeesComponent} from './components/add-employees/add-employees.component'
import { EmployeesRoutingModule } from './employees-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule,  SharedModule, TableModule } from '@coreui/angular';
import {FormlyModule} from '@ngx-formly/core'
import {ButtonModule} from 'primeng/button';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component'

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
 
    FormlyModule.forRoot({
      validationMessages: [
        {name: 'required', message: 'This field is required'},
      ],
    }),
   
  
  ]
})
export class EmployeesModule { }
