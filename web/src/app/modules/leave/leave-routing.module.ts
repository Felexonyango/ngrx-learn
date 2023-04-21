import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllLeaveRequestsComponent } from './components/all-leave-requests/all-leave-requests.component';
import { AllLeavesComponent } from './components/all-leaves/all-leaves.component';
import { CreateLeaveComponent } from './components/create-leave/create-leave.component';
import { LeaveDetailsComponent } from './components/leave-details/leave-details.component';
import { LeaveHistoryComponent } from './components/leave-history/leave-history.component';
import { LeaveSettingsComponent } from './components/leave-settings/leave-settings.component';
import { ApprovedLeavesComponent } from './components/approved-leaves/approved-leaves.component';
import { DepartmentSettingComponent } from './components/department-setting/department-setting.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { CreateLeaveTypeComponent } from './components/create-leave-type/create-leave-type.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'all-leaves',
    pathMatch: 'full',
  },
  {
    path: 'request/history',
    component: LeaveHistoryComponent

  },
  {

    path:'leave-details/:id',
    component:LeaveDetailsComponent
  },
  {
    path: 'all-approved-leaves',
    component: ApprovedLeavesComponent
  },
  {
    path:'all-request/history',
    component:AllLeavesComponent
  },
  {
    path: 'apply-leave',
    component: CreateLeaveComponent
  },
  {
    path: 'edit-leaveId/:leaveId',
    component: CreateLeaveComponent
  },
  {
    path:'leave-setting',
    component:LeaveSettingsComponent
  },
  {
    path:"create-department",
    component: CreateDepartmentComponent
  },
  {
    path:"edit-department/:departmentId",
    component: CreateDepartmentComponent
  },
  {
    path:'create-leaveType',
    component:CreateLeaveTypeComponent
  },
  {
    path:'edit-leaveType/:leaveTypeId',
    component:CreateLeaveTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
