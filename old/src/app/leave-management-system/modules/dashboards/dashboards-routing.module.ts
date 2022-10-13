import {Component, NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {AdminDashboardsComponent} from './components/admin-dashboards/admin-dashboards.component'
import {EmployeeDashboardsComponent} from './components/employee-dashboards/employee-dashboards.component'
const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminDashboardsComponent,
  },
  {
    path: 'employee',
    component: EmployeeDashboardsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
