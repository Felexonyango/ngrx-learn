import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import {FormlyFieldConfig} from '@ngx-formly/core'
import {Subscription} from 'rxjs'
import {ILeaveType} from 'src/app/model/leave'
@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss']
})
export class LeaveTypeComponent implements OnInit {
  
  leaveTypes: ILeaveType[] = []
  leaveType: ILeaveType
  constructor() { }

  ngOnInit(): void {
  }

}
