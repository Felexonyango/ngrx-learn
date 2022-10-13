import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import {FormlyFieldConfig} from '@ngx-formly/core'
import {Subscription} from 'rxjs'
import {ILeaveDays} from 'src/app/leave-management-system/models/leaveDays.model'
import {ILeaveType} from 'src/app/leave-management-system/models/leavetype.model'

import {LeavesService} from '../../../services/leaves.service'

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss'],
})
export class LeaveTypeComponent implements OnInit, OnDestroy {
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
    private leaveService: LeavesService,
   
    ) {}

  ngOnInit(): void {
    this.getLeaveTypes()
    
    
   
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  showDialog() {
    this.display = true
    this.errorMessage = ''
    this.form.reset()
  }

  getLeaveTypes() {
    this.subscription.add(
      this.leaveService.getAllLeaveTypes().subscribe(
        (res) => {
          this.leaveTypes = res.result
          console.log(res)
        },
        (err) => {}
      )
    )
  }
  createLeaveType() {
    this.leaveType = this.form.value
    this.subscription.add(
      this.leaveService.createLeavetype(this.leaveType).subscribe(
        (res) => {
          this.getLeaveTypes()
          this.display = false
        },
        (err) => {
          this.display = true
          this.errorMessage = err.error.exception.response
        }
      )
    )
  }

  deleteLeaveType(leave_id) {
    this.subscription.add(
      this.leaveService.deleteLeavetype(leave_id).subscribe(
        (res) => {
          this.errorMessage = 'Successfully Deleted'
          this.getLeaveTypes()
        },
        (err) => {}
      )
    )
  }

  getLeavetypeById(ID: string) {
    this.subscription.add(
      this.leaveService.getLeavetypeByID(ID).subscribe({
        next:(res)=>{

          this.model={
            leaveType:res.result.leaveType,
            numberOfDays:res.result.numberOfDays

          }
          this.isEdit=true
        }
      })
     
    )
  }

  updateLeavetypeModal(leave_id:string){
    this.display=true
    this.isEdit = true
    this.id =leave_id
    this.getLeavetypeById(this.id)
 
  }
  UpdateLeaveType(){
    let editLeaveType={
      _id:this.id,
    leaveType:{
      leaveType:this.model. leaveType,
      numberOfDays:this.model.numberOfDays
    }
    }
      this.subscription.add(
        this.leaveService.updateLeavetype(editLeaveType._id, editLeaveType.leaveType).subscribe(
          (res)=>{
            this.getLeaveTypes()
            this.display=false
        },(err)=>{
          this.display=true
        }
         
        )
      )
  }

}

