import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { ILeaveType } from 'src/app/model/leave';
import { select, Store } from '@ngrx/store';
import { LeaveState } from 'src/app/store/reducer/leaveReducer';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { LeaveService } from 'src/app/services/leave.service';
import {applyLeaveFormlyFields} from './apply-leave-formly'
import { LeaveTypes } from 'src/app/store/actions/leavetype.actions';
import { getleaveTypes } from 'src/app/store/selector/leavetype.selector';
import { LeaveTypeService } from 'src/app/services/leave-type.service';
 @Component({
  selector: 'app-create-leave',
  templateUrl: './create-leave.component.html',
  styleUrls: ['./create-leave.component.scss']
})
export class CreateLeaveComponent implements OnInit {
  subscription = new Subscription;
  
  remainingDays: any;
  minimumDate = new Date();
  minimumEndDate = new Date()
  dates = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });
  requested: any;
  leaveEnd = "";
  applyLeaveForm = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  application: any
  isEdit: boolean
  objectKeys = Object.keys
  objectValue = Object.values
  WEEKEND = [moment().day("Saturday").weekday(), moment().day("Sunday").weekday()]
  response: string
  // moment = require('moment-business-days')
  // require: any
  // testEndDate: Date = new Date()
    startDate: any;
    endDate: any
  constructor(
    private leaveService: LeaveService,
    // private messageService:MessageService
    private activatedRoute: ActivatedRoute,
    private router: Router
 
    ) {}

  ngOnInit(): void {

    this.updateOptions();
    this.isEdit= false
    this.getRemainingDays();
    this.fields[1].templateOptions['days'] = this.requested
    this.getLeaveTypes();
    this.getLeaveIdFromParam();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitApplication() {
    this.application = this.applyLeaveForm.value
    this.endDate =this.addBusinessDays2(this.startDate, this.application.requested).toDate()
    this.application = { ...this.application, endDate:this.endDate, startDate:this.startDate};
    this.leaveEnd = this.endDate
    const id = this.activatedRoute.snapshot.paramMap.get("id")
    
 
    const submitUrl = this.isEdit ? this.leaveService.updateLeaveRequest(id, this.application) :
      this.leaveService.createLeaveRequest(this.application)
    this.subscription.add(submitUrl.subscribe({
      next: (res) => {
        this.applyLeaveForm.reset() 
        this.response = res.message
        this.router.navigate(['/leave/request/history'])
        
      }
    }))

  }

 
  updateOptions() {
    this.fields = applyLeaveFormlyFields;
    this.fields[0].fieldGroup[0].templateOptions.options = this.leaveService.getLeaveTypes()
   
  }
  getLeaveTypes() {
    this.subscription.add(this.leaveService.getLeaveTypes().subscribe((res) => {
    }))
  }
  getRemainingDays() {
    this.subscription.add(this.leaveService.getRemainingDays().subscribe((res) => {
      this.remainingDays = res.result
      this.remainingDays= Object.entries(this.remainingDays)
    }))
  }
  getLeaveIdFromParam() {
    let leaveId = this.activatedRoute.snapshot.paramMap.get("id")
    if (leaveId) {
      this.isEdit = true
      this.getLeaveDetails(leaveId)
    }
  }
  getLeaveDetails(id) {
    this.subscription.add(this.leaveService.getLeaveRequestDetail(id).subscribe((res) => {
      this.application = res.result;
      this.model = this.application
      this.leaveEnd = this.application.endDate
    }))
  }
  selectedDate() {
    this.application = this.applyLeaveForm.value
    if (this.application.requested) {
      this.endDate = this.addBusinessDays2(this.startDate, this.application.requested)
      const formEndDate = new Date(this.endDate.toString())
      this.endDate = formEndDate 
      
      this.leaveEnd = this.endDate
      
    }
    
    // if(this.endDate){
    //   console.log("test")
    //   this.application.requested =  (this.endDate - this.startDate)
    //   console.log(this.application.requested)
    // }
  }
  addBusinessDays2 (date, days)  {
    var d = moment(new Date(date)).add(Math.floor(days / 5) * 7, 'd');
    var remaining = days % 5;
    while (remaining) {
      d.add(1, 'd');
      if (d.day() !== 0 && d.day() !== 6)
        remaining--;
    }
    return d;
  };




}
