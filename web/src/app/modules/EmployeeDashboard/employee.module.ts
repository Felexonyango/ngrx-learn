import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from '@coreui/angular';
import { FormlyModule } from '@ngx-formly/core';
import { PaginatorModule } from 'primeng/paginator';
import { EmployeeDashboardComponent } from './component/employee-dashboard/employee-dashboard.component';


@NgModule({
  declarations: [
    EmployeeDashboardComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    FormlyModule,
    ReactiveFormsModule,
    FormsModule,
    PaginatorModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
