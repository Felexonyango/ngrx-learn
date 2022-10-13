import { Component, OnInit } from '@angular/core';
import { ILeaves } from 'src/app/leave-management-system/models/leavehistory.model';

import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LeavesService } from '../../services/leaves.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { AppBreadcrumbService } from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service';
@Component({
  selector: 'app-all-leaverequest',
  templateUrl: './all-leaverequest.component.html',
  styleUrls: ['./all-leaverequest.component.scss']
})


export class AllLeaverequestComponent implements OnInit {

Ileaves:ILeaves[]=[]
leave:ILeaves
id:any

subscription = new Subscription();

  constructor( 
    private leaveservice:LeavesService,
    private route:Router,
    private primengConfig: PrimeNGConfig,
    private breadcrumbService: AppBreadcrumbService,
     
     ) {
      this.breadcrumbService.setItems([
        {label: 'NEW LEAVE REQUESTS', routerLink: 'all-leaverequest'},
      ])
      }

  ngOnInit(){
  this.primengConfig.ripple = true;
  this.getAllLeaveRequests()
  this.approveleave(this.id)
  this.declineleave(this.id)
  
  }
  
  onleaveRequest(id) {
    this.route.navigate([`/leave/request/admin/leavedetails/${id}`]);
    
}
getAllLeaveRequests() {

  this.subscription.add(this.leaveservice.getAllNewLeaveRequest().subscribe((data) => {
    this.Ileaves = data.result;
}));

}

approveleave(id:any) {

  this.subscription.add(this.leaveservice.approveLeaveRequest(id).subscribe((data) => {
    this.leave =data.result
    
   
}));

}

declineleave(id:any){
  this.subscription.add(this.leaveservice.declineLeaveRequest(id).subscribe((data) => {
   this.leave =data.result
   
  }))


}

}