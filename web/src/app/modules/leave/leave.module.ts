import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveSettingsComponent } from './components/leave-settings/leave-settings.component';
import { LeaveTypeComponent } from './components/leave-type/leave-type.component';
import { TableModule } from 'primeng/table'
import {CardModule} from 'primeng/card'
@NgModule({
  declarations: [
    LeaveSettingsComponent,
    LeaveTypeComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    TableModule,
    CardModule,
    // SidebarModule,
    // ButtonModule,
    // DialogModule,
    // FormlyModule,
    // ReactiveFormsModule,
    // RippleModule,
    // FormsModule,
  
  ]
})
export class  LeaveModule { }
