import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './component/employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee-dashboard',
    pathMatch: 'full',
  },
  {
    path:'employee-dashboard',
    component:EmployeeDashboardComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
