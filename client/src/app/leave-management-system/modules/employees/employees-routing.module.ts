import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {AddEmployeesComponent} from './components/add-employees/add-employees.component'
import {AllEmployeesComponent} from './components/all-employees/all-employees.component'
import {EmployeeDetailsComponent} from './components/employee-details/employee-details.component'

const routes: Routes = [
  {
    path: 'add',
    component: AddEmployeesComponent,
  },
  {
    path: 'add/:id',
    component: AddEmployeesComponent,
  },
  {
    path: 'details/:ID',
    component: EmployeeDetailsComponent,
  },
  {
    path: 'all',
    component: AllEmployeesComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
