import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {EmployeesRoutingModule} from './employees-routing.module'
import {AddEmployeesComponent} from './components/add-employees/add-employees.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {FormlyModule} from '@ngx-formly/core'
import {ButtonModule} from 'primeng/button'
import {FormlyPrimeNGModule} from '@ngx-formly/primeng'
import {InputTextModule} from 'primeng/inputtext'
import {EmployeeDetailsComponent} from './components/employee-details/employee-details.component'
import {TableModule} from 'primeng/table'
import {ChartModule} from 'primeng/chart'
import {AllEmployeesComponent} from './components/all-employees/all-employees.component'
import {DialogModule} from 'primeng/dialog'
import {CardModule} from 'primeng/card'
import {AvatarModule} from 'primeng/avatar'
import {AvatarGroupModule} from 'primeng/avatargroup'
import {FileUploadModule} from 'primeng/fileupload'

import {SharedModule} from 'src/app/common/modules/shared/shared.module'
// import {EmployeeParollDetailsComponent} from './components/employee-paroll-details/employee-paroll-details.component';
import {CreateUserRolesComponent} from './components/create-user-roles/create-user-roles.component'
import { StepsModule } from 'primeng/steps'


@NgModule({
  declarations: [
    AddEmployeesComponent,
    EmployeeDetailsComponent,
    AllEmployeesComponent,
    CreateUserRolesComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    FormlyPrimeNGModule,
    AvatarModule,
    AvatarGroupModule,
    FileUploadModule,
  
    FormlyModule.forRoot({
      validationMessages: [
        {name: 'required', message: 'This field is required'},
      ],
    }),
    InputTextModule,
    TableModule,
    ChartModule,
    DialogModule,
    SharedModule,
    StepsModule
  ],
})
export class EmployeesModule {}
