import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Paginator } from 'primeng/paginator';
import { Observable, Subscription } from 'rxjs';
import { IEmployeeSummary } from 'src/app/model/employees';
import { ILeaves } from 'src/app/model/leave';
import { EmployeeService } from 'src/app/services/employees.service';
import { leaveActionType } from 'src/app/store/actions/leave.action';
import { LeaveState } from 'src/app/store/reducer/leaveReducer';
import { getleaves } from 'src/app/store/selector/leave.selector';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  subscription = new Subscription()
  employeeSummary:IEmployeeSummary


  approvedleaves$:Observable<ILeaves[]>
  constructor(
    private store: Store<LeaveState>,
    private router: Router,
    private employeeservice:EmployeeService,
  ) { 
  
  }
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  leaveTableColumns: string[] = [
 
    'leaveType',
    'startDate',
    'EndDate',
    'status',
    'Action'
    
  ];

  ngOnInit(): void {
    this.getApprovedleaves();
    this.getEmployeeSummarys()
  }

  getApprovedleaves() {
    this.approvedleaves$ = this.store.pipe(select(getleaves));
    this.store.dispatch(leaveActionType.loadapprovedleavesByUser());
  }
  handleSelect(id: string) {
    this.router.navigate([`/leave/leave-details/${id}`])
  }
  onView(id:string){
    this.router.navigate([`/leave/leave-details/${id}`]);
  }
  onEditBtnClick(id:string){
    
  }
  onDeleteleave(id:string){
    this.store.dispatch(leaveActionType.deleteleave({ id}))
  }



  getEmployeeSummarys(){
    this.subscription.add(this.employeeservice.getEmployeeSummary().subscribe((res)=>{
      this.employeeSummary=res.result
        console.log(this.employeeSummary, "hello")
    }
     
     
      ))
  
    }


}
