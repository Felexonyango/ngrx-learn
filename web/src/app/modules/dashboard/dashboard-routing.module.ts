import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  },
  {
    path:'employee-dashboard',
    component:EmployeeDashboardComponent

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
