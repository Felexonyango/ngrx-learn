import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveSettingsComponent } from './components/leave-settings/leave-settings.component';

const routes: Routes = [
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
