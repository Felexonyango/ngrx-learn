import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component'
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from '@coreui/angular';
import { FormlyModule } from '@ngx-formly/core';
import { PaginatorModule } from 'primeng/paginator';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    EmployeeDashboardComponent
   
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    FormlyModule,
    ReactiveFormsModule,
    FormsModule,
    PaginatorModule,
  ]
})
export class DashboardModule { }
