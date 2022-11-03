import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllLeavesComponent } from './components/all-leaves/all-leaves.component';
import { CreateLeaveComponent } from './components/create-leave/create-leave.component';
import { LeaveSettingsComponent } from './components/leave-settings/leave-settings.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'all-leaves',
    pathMatch: 'full',
  },
  {
    path: 'all-leaves',
    component: AllLeavesComponent
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
