import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminDashboardComponent} from '../admin/components/admin-dashboard.component'
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from '@coreui/angular';
import { FormlyModule } from '@ngx-formly/core';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
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
export class AdminDashboardModule { }
