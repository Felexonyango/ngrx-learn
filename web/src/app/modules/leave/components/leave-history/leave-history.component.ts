import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Observable, Subscription } from 'rxjs';
import { IEmployee } from 'src/app/model/employees';
import { ILeaves } from 'src/app/model/leave';
import { LeaveService } from 'src/app/services/leave.service';
import { leaveActionType } from 'src/app/store/actions/leave.action';
import { LeaveState } from 'src/app/store/reducer/leaveReducer';
import {getleaves } from 'src/app/store/selector/leave.selector'
@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.scss']
})
export class LeaveHistoryComponent implements OnInit {
  Ileaves: Observable<ILeaves[]>
 

  employee: IEmployee

  id: any
  imageToShow: any;
  subscription = new Subscription();
  display: boolean
  initials: string


  constructor(
    private leavService: LeaveService,
   
    private router: Router,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    private store: Store<LeaveState>  
   

  ) {}


  @ViewChild('paginator', { static: true }) paginator: Paginator;

  leaveTableColumns: string[] = [
    'leaveType',
    'leaveDuration',
    'startDate',
    'EndDate',
    'status',
    'Action'
    
  ];

  ngOnInit() {
    this.primengConfig.ripple = true
   this.getLeaveHistroy()
    // this.deleteLeave(this.id)
    // this.getLeaveSummary()
    
  }

  getLeaveDetails(id) {
    this.subscription.add(
      this.leavService.getLeaveRequestDetail(id).subscribe((res) => { })
    )
  }

  getLeaveHistroy(){
    this.Ileaves = this.store.pipe(select(getleaves));
    this.store.dispatch( leaveActionType.loadleavesByuser() )
  }

  // getLeaveRequestsByUser() {
  //   this.subscription.add(
  //     this.leavService.getLeaveRequestsByUser().subscribe(
  //       (data) => {
  //         this.Ileaves = data.result

  //       },
  //       (error) => console.log(error)
  //     )
  //   )
  // }

  handleSelect(id: string) {
    this.router.navigate([`/leave/leaves/details/${id}`])
  }
  updateLeave(id: string) {
    this.router.navigate([`/leave/leaves/apply/${id}`])
  }


  // deleteLeave(id: any) {
  //   this.subscription.add(
  //     this.leavService.deleteLeaveRequest(id).subscribe({
  //       next: (res) => {
  //         this.Ileaves = this.Ileaves.filter((leave) => leave._id !== id)
  //         console.log(this.Ileaves, 'delete')
  //         this.display = false
          
  //         this.router.navigate(['/leave/leaves/history'])
  //       },

  //       error(err) {
  //        console.error(err)
  //       },
  //     })
  //   )
  // }
  deleteLeaveDialog() {
    this.display = true;
  }
  cancelDeleteLeaveDialog() {
    this.display = false
  }

  // getLeaveSummary() {
    
  //   this.subscription.add(
  //     this.leavService.getLeaveSummary().subscribe((data) => {
  //       this.leave = data.result
  //       console.log(this.leave ,'dwdwedew')
  //     })
  //   )
  // }



    // console.log(typeof this.employee.firstName, "first name")
    // const firstNameArr = this.employee.firstName.split("")
    // const firstNameFirstLetter= this.employee.firstName.split("")[0].toString()
    // const lastNameFirstLetter = this.employee.lastName.split("")[0].toString()
    // this.initials = firstNameFirstLetter.concat(lastNameFirstLetter)
    // console.log(this.initials)

    onDeleteleave(id:any){

    }
onEditBtnClick(id:any){

}
onView(id:any){

}
 
}
