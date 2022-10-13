import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MenuModule} from 'primeng/menu'
import {TagModule} from 'primeng/tag'
import {DashboardsRoutingModule} from './dashboards-routing.module'
import {AdminDashboardsComponent} from './components/admin-dashboards/admin-dashboards.component'
import {EmployeeDashboardsComponent} from './components/employee-dashboards/employee-dashboards.component'
import {TableModule} from 'primeng/table'
import {ChartModule} from 'primeng/chart'
import {ButtonModule} from 'primeng/button'
import {DialogModule} from 'primeng/dialog'
import {FormGroup, FormsModule} from '@angular/forms'
import {FormlyPrimeNGModule} from '@ngx-formly/primeng'
import {CardModule} from 'primeng/card'
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [EmployeeDashboardsComponent, AdminDashboardsComponent],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    MenuModule,
    TableModule,
    ChartModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    FormlyPrimeNGModule,
    CardModule,
    TagModule,
    ReactiveFormsModule,

    // FormGroup
  ],
})
export class DashboardModule {}
