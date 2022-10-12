import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AllLeaveSettingsComponent} from './components/admin-leave-settings/all-leave-settings/all-leave-settings.component'
import {AllLeaverequestComponent} from './components/all-leaverequest/all-leaverequest.component'
import {ApplyLeaveUserComponent} from './components/apply-leave-user/apply-leave-user.component'
import {EditleaveRequestComponent} from './components/EditleaveRequest/editleave-request/editleave-request.component'
import {LeaveSettingsComponent} from './components/leave-settings/leave-settings.component'
import {LeavehistoryComponent} from './components/leavehistory/leavehistory.component'
import {LeaverequestDetailsComponent} from './components/leaverequest-details/leaverequest-details.component'
import { AdminLeaverequestdetailsComponent } from './components/admin-leaverequestdetails/admin-leaverequestdetails.component'
import { AdminLeaveHistoryComponent } from './components/admin-leave-history/admin-leave-history.component'
import { DepartmentdetailsComponent } from './components/admin-leave-settings/departmentdetails/departmentdetails.component'
import { DepartmentLeaveRequestComponent } from './components/department-leave-request/department-leave-request.component'
import { DepartmentLeaveHistoryComponent } from './components/department-leave-history/department-leave-history.component'

const routes: Routes = [
  // {
  //     path: "",
  //     redirectTo: "history",
  //     pathMatch: "full",
  // },
  {
    path: 'history',
    component: LeavehistoryComponent,
  },
  {
    path: 'details/:ID',
    component: LeaverequestDetailsComponent,
  },
  {
    path: 'details/:leaveId/edit',
    component: EditleaveRequestComponent,
  },
  {
    path: 'settings',
    component: AllLeaveSettingsComponent,
  },
  {
    path: 'all-leaverequest',
    component: AllLeaverequestComponent,
  },
  {
    path: 'department-leaverequest',
    component: DepartmentLeaveRequestComponent
  },
  { path:'apply',
    component: ApplyLeaveUserComponent,
  },
  {
    path: 'apply/:id',
    component: ApplyLeaveUserComponent,
  },
  {
    path:'admin/leavedetails/:ID',
    component:AdminLeaverequestdetailsComponent
  },
  {
    path:'admin/leavehistory',
    component:AdminLeaveHistoryComponent
  },
  {
    path:'department-details/:id',
    component:DepartmentdetailsComponent
  },
  {
    path:'department-leave-history',
    component:DepartmentLeaveHistoryComponent
  }

  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavesRoutingModule {}
