import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveSettingsComponent } from './components/leave-settings/leave-settings.component';
import { LeaveTypeComponent } from './components/leave-type/leave-type.component';


@NgModule({
  declarations: [
    LeaveSettingsComponent,
    LeaveTypeComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule
  ]
})
export class  LeaveModule { }
