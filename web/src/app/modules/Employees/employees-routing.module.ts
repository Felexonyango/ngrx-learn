import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeesComponent } from './components/add-employees/add-employees.component';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-employees',
    pathMatch: 'full',
  },
  {
    path: 'all-employees',
    component: AllEmployeesComponent,
  },
  {
    path: 'employee/:id',
    component: EmployeeDetailsComponent,
  },
  {
    path: 'create',
    component: AddEmployeesComponent,
  },

{
  path:'employee-edit/:id',
  component:EditEmployeeComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
