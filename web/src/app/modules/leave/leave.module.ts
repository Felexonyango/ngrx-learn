import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveSettingsComponent } from './components/leave-settings/leave-settings.component';
import { LeaveTypeComponent } from './components/leave-type/leave-type.component';
import {TableModule} from 'primeng/table'
import {CardModule} from 'primeng/card'
import {DialogModule} from 'primeng/dialog'
import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { CreateLeaveComponent } from './components/create-leave/create-leave.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { PaginatorModule } from 'primeng/paginator';
import { DepartmentSettingComponent } from './components/department-setting/department-setting.component';
import { AllLeavesComponent } from './components/all-leaves/all-leaves.component';
import { CalendarModule } from 'primeng/calendar';
import { LeaveHistoryComponent } from './components/leave-history/leave-history.component';
import { AllLeaveRequestsComponent } from './components/all-leave-requests/all-leave-requests.component';
import { LeaveDetailsComponent } from './components/leave-details/leave-details.component';
import { ApprovedLeavesComponent } from './components/approved-leaves/approved-leaves.component';
import { ToastModule } from "primeng/toast";
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    LeaveSettingsComponent,
    LeaveTypeComponent,
    CreateLeaveComponent,
    DepartmentSettingComponent,
    AllLeavesComponent,
    LeaveHistoryComponent,
    AllLeaveRequestsComponent,
    LeaveDetailsComponent,
    ApprovedLeavesComponent
  

  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    TableModule,
    CardModule,
    
    DialogModule,
    FormlyModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ToastModule,    
    MessagesModule ,
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
