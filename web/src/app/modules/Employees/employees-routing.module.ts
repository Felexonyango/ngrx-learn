import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeesComponent } from './components/add-employees/add-employees.component';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';

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
    path: 'create',
    component: AddEmployeesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
