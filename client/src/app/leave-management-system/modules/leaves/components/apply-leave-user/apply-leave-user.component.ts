import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import * as moment from 'moment';
// import * as moment from 'moment-business-days';
// const moment = require('moment-business-days');
import { MessageService } from 'primeng/api';
import { Messages } from 'primeng/messages';
import { Subscription } from 'rxjs';
import { LeavesService } from 'src/app/leave-management-system/modules/leaves/services/leaves.service';
import { AppBreadcrumbService } from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service';
import { applyLeaveFormlyFields } from './apply-leave-formly';

@Component({
  selector: 'app-apply-leave-user',
  templateUrl: './apply-leave-user.component.html',
  styleUrls: ['./apply-leave-user.component.scss']
})
export class ApplyLeaveUserComponent implements OnInit {

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
    private leaveService: LeavesService,
    // private messageService:MessageService
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private breadcrumbService: AppBreadcrumbService,
     
    ) {
     this.breadcrumbService.setItems([
      // {label: 'APPLY LEAVE', routerLink: '/leave/leaves/apply'},
       {label: 'APPLY LEAVE', routerLink: '/leave/leaves/apply'},
     ])
     }

  ngOnInit(): void {

    this.updateOptions();
    this.isEdit= false
    this.getRemainingDays();
    this.fields[1].templateOptions.days = this.requested
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

  // restrictPastDates(){
  //   let today = moment();
  //   this.fields[1].fieldGroup[0].templateOptions.datepickerOptions.min = today.format("YYYY-MM-DD")
  //   console.log(this.fields[1].fieldGroup[0].templateOptions.datepickerOptions.min)
  //   // this.minimumDate = moment().format("YYYY-MM-DD")
  // }
  updateOptions() {
    this.fields = applyLeaveFormlyFields;
    this.fields[0].fieldGroup[0].templateOptions.options = this.leaveService.getLeaveTypes()
    // console.log(this.fields[0].fieldGroup[0].templateOptions.options)
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
