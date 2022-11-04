import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllLeaveRequestsComponent } from './components/all-leave-requests/all-leave-requests.component';
import { AllLeavesComponent } from './components/all-leaves/all-leaves.component';
import { CreateLeaveComponent } from './components/create-leave/create-leave.component';
import { LeaveHistoryComponent } from './components/leave-history/leave-history.component';
import { LeaveSettingsComponent } from './components/leave-settings/leave-settings.component';

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
    path: 'all-leave-requests',
    component: AllLeaveRequestsComponent
  },
  {
    path: 'apply-leave',
    component: CreateLeaveComponent
  },
  {
    path:'leave-setting',
    component:LeaveSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
