import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TableModule} from 'primeng/table'
import {CardModule} from 'primeng/card'
import {LeavehistoryComponent} from './components/leavehistory/leavehistory.component'
import {SidebarModule} from 'primeng/sidebar'
import {ButtonModule} from 'primeng/button'
import {LeaverequestDetailsComponent} from './components/leaverequest-details/leaverequest-details.component'
import {LeavesRoutingModule} from './leaves-routing.module'
import {LeaveSettingsComponent} from './components/leave-settings/leave-settings.component'
import {DialogModule} from 'primeng/dialog'
import {FormlyModule} from '@ngx-formly/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {EditleaveRequestComponent} from './components/EditleaveRequest/editleave-request/editleave-request.component'
import {AllLeaverequestComponent} from './components/all-leaverequest/all-leaverequest.component'
import {RippleModule} from 'primeng/ripple'
import {ApplyLeaveUserComponent} from './components/apply-leave-user/apply-leave-user.component'
import {CalendarModule} from 'primeng/calendar'
import {DepartmentSettingsComponent} from './components/admin-leave-settings/department-settings/department-settings.component'
import {AllLeaveSettingsComponent} from './components/admin-leave-settings/all-leave-settings/all-leave-settings.component'
import {LeaveTypeComponent} from './components/admin-leave-settings/leave-type/leave-type.component'
import {HolidaysComponent} from './components/admin-leave-settings/holidays/holidays.component'
import {AdminLeaverequestdetailsComponent} from './components/admin-leaverequestdetails/admin-leaverequestdetails.component'
import {ImageModule} from 'primeng/image'
import {AvatarModule} from 'primeng/avatar'
import {AvatarGroupModule} from 'primeng/avatargroup'
import {AdminLeaveHistoryComponent} from './components/admin-leave-history/admin-leave-history.component'
import {DepartmentdetailsComponent} from './components/admin-leave-settings/departmentdetails/departmentdetails.component'

import { DepartmentLeaveRequestComponent } from './components/department-leave-request/department-leave-request.component';
import { DepartmentLeaveHistoryComponent } from './components/department-leave-history/department-leave-history.component';

@NgModule({
  declarations: [
    LeavehistoryComponent,
    LeaverequestDetailsComponent,
    LeaveSettingsComponent,
    EditleaveRequestComponent,
    AllLeaverequestComponent,
    ApplyLeaveUserComponent,
    DepartmentSettingsComponent,
    AllLeaveSettingsComponent,
    LeaveTypeComponent,
    HolidaysComponent,
    AdminLeaverequestdetailsComponent,
    AdminLeaveHistoryComponent,
    DepartmentdetailsComponent,
    DepartmentLeaveRequestComponent,
    DepartmentLeaveHistoryComponent,
   
  ],
  imports: [
    CommonModule,
    LeavesRoutingModule,
    TableModule,
    CardModule,
    SidebarModule,
    ButtonModule,
    DialogModule,
    FormlyModule,
    ReactiveFormsModule,
    RippleModule,
    FormsModule,
    ImageModule,
    CalendarModule,
    AvatarModule,
    AvatarGroupModule,
  
  ],
})
export class  LeavesModule {}
