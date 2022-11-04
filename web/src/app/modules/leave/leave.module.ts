import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveSettingsComponent } from './components/leave-settings/leave-settings.component';
import { LeaveTypeComponent } from './components/leave-type/leave-type.component';
import {TableModule} from 'primeng/table'
import {CardModule} from 'primeng/card'
import {DialogModule} from 'primeng/dialog'
import { ButtonModule } from 'primeng/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { CreateLeaveComponent } from './components/create-leave/create-leave.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { PaginatorModule } from 'primeng/paginator';
import { DepartmentSettingComponent } from './components/department-setting/department-setting.component';
import { AllLeavesComponent } from './components/all-leaves/all-leaves.component';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [
    LeaveSettingsComponent,
    LeaveTypeComponent,
    CreateLeaveComponent,
    DepartmentSettingComponent,
    AllLeavesComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    FormlyModule,
    ReactiveFormsModule,
    FormsModule,
    PaginatorModule,
    CalendarModule,
    FormlyBootstrapModule ,
 
    FormlyModule.forRoot({
      validationMessages: [
        {name: 'required', message: 'This field is required'},
      ],
    }),
  
  
  ]
})
export class  LeaveModule { }
