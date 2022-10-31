import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { select, Store } from '@ngrx/store'
import {FormlyFieldConfig} from '@ngx-formly/core'
import {Observable, Subscription} from 'rxjs'
import {ILeaveType} from 'src/app/model/leave'
import { LeaveTypes } from 'src/app/store/actions/leavetype.actions'
import { LeaveTypeState } from 'src/app/store/reducer/leavetype.reducer'
import {getleaveTypes} from 'src/app/store/selector/leavetype.selector'
@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss']
})
export class LeaveTypeComponent implements OnInit {
  subscription: Subscription = new Subscription()
  leaveTypes$: Observable<ILeaveType[]>;
  leaveType: ILeaveType
  isEdit: boolean = false
  display: boolean = false
  errorMessage: string = ''
  form = new FormGroup({})
  model: any = {}
id:string
  fields: FormlyFieldConfig[] = [
    {
      className: "col-6",
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
    this.getLeaveTypes()
  }


  showDialog() {
    this.display = true
    this.errorMessage = ''
    this.form.reset()
  }
  createLeaveType(){
   this.leaveType = this.form.value
   const leaveType:ILeaveType={...this.form.value}
   this.store.dispatch(LeaveTypes.createLeaveType({leaveType}))
   this.form.reset()

  } 

  getLeaveTypes(){
    this.leaveTypes$ = this.store.pipe(select(getleaveTypes))
    this.store.dispatch(LeaveTypes.LoadleaveTypes())

    console.log(this.leaveTypes$)
  }
  UpdateLeaveType(){

  }
  updateLeavetypeModal(leave_id:string){
    this.display=true
    this.isEdit = true
    this.id =leave_id
    this.getLeavetypeById()
 
  }

  deleteLeaveType(id:string){

  }

  getLeavetypeById(){}

}