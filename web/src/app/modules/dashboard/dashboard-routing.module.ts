import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from '../EmployeeDashboard/component/employee-dashboard/employee-dashboard.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'admin-dashboard',
    pathMatch: 'full',
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
