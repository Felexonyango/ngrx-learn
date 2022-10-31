import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { ILeaveType } from 'src/app/model/leave';
import { Store } from '@ngrx/store';
import { LeaveTypeState } from 'src/app/store/reducer/leavetype.reducer';
import { LeaveTypes } from 'src/app/store/actions/leavetype.actions'
@Component({
  selector: 'app-create-leave',
  templateUrl: './create-leave.component.html',
  styleUrls: ['./create-leave.component.scss']
})
export class CreateLeaveComponent implements OnInit {
  subscription: Subscription = new Subscription()
  leaveTypes: ILeaveType[] = []
  leaveType: ILeaveType
  isEdit: boolean = false
  display: boolean = false
  errorMessage: string = ''
  form = new FormGroup({})
  model: any = {}
id:string
  fields: FormlyFieldConfig[] = [
    {
      key: 'leaveType',
      type: 'input',
      templateOptions: {
        label: 'Leave Type Name',
        placeholder: 'Casual Leave',
        required: true,
      },
    },
    {
      key: 'numberOfDays',
      type: 'input',
      templateOptions: {
        label: 'Number of leave days',
        placeholder: '10',
        required: true,
        type: 'number',
        min: 1,
      },
    },
  ]
  constructor(
    private store: Store<LeaveTypeState>
  ) { }

  ngOnInit(): void {
  }

  createLeavetype(){
   this.leaveType = this.form.value

   const leaveType:ILeaveType={...this.form.value}
   this.store.dispatch(LeaveTypes.createLeaveType({leaveType}))
   this.form.reset()

  } 
}
