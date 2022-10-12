import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ILeaves } from 'src/app/leave-management-system/models/leavehistory.model';
import { AppBreadcrumbService } from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service';
import { LeavesService } from '../../services/leaves.service';

@Component({
  selector: 'app-admin-leave-history',
  templateUrl: './admin-leave-history.component.html',
  styleUrls: ['./admin-leave-history.component.scss']
})
export class AdminLeaveHistoryComponent implements OnInit {

  Ileaves:ILeaves[]=[]
subscription = new Subscription()

  constructor( 
    private leaveservice:LeavesService,
    private route:Router,
    private primengConfig: PrimeNGConfig,
    private breadcrumbService: AppBreadcrumbService,
     
     ) {
      this.breadcrumbService.setItems([
        {label: 'ALL LEAVE HISTORY', routerLink: 'admin/leavehistory'},
      ])
      }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getleavehistory()
  }


  onleaveRequest(id:string) {
    this.route.navigate([`/leave/request/admin/leavedetails/${id}`]);
    
}
  getleavehistory() {

    this.subscription.add(this.leaveservice.getAllLeaves().subscribe((data) => {
      this.Ileaves = data.result;
  }));
  
  }
}
