import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Paginator } from 'primeng/paginator';
import { Observable, Subscription } from 'rxjs';
import { IEmployeeSummary } from 'src/app/model/employees';
import { ILeaves } from 'src/app/model/leave';
import { EmployeeService } from 'src/app/services/employees.service';
import { leaveActionType } from 'src/app/store/actions/leave.action';
import { LeaveState } from 'src/app/store/reducer/leaveReducer';
import { getleaves } from 'src/app/store/selector/leave.selector';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  subscription = new Subscription()

  employeeSummary:IEmployeeSummary


  leaveRequests$: Observable<ILeaves[]>
  pendingleaves$: Observable<ILeaves[]>
  approvedleaves$:Observable<ILeaves[]>
  endingleaves$:Observable<ILeaves[]>

  @ViewChild('paginator', { static: true }) paginator: Paginator;

  leaveTableColumns: string[] = [
    'Employee Name',
    'leaveType',
    'leaveDuration',
    'startDate',
    'EndDate',
    'status',
    'Action'
    
  ];
  constructor(
    private store: Store<LeaveState>,
    private router: Router,
    private employeeservice:EmployeeService
    
    ) {}

  ngOnInit(): void {
    this.getEmployeeSummarys()
    this.getPendingleaves();
    this.getApprovedleaves();
    this.getEndingleaves();
    this.getNewleaveRequests();
    
  }

  getNewleaveRequests() {
    this.leaveRequests$= this.store.pipe(select(getleaves));
    this.store.dispatch(leaveActionType.loadnewleaves());
  }

  getPendingleaves() {
    this.pendingleaves$ = this.store.pipe(select(getleaves));
    this.store.dispatch(leaveActionType.loadpendingleaves());
  }
  getApprovedleaves() {
    this.approvedleaves$ = this.store.pipe(select(getleaves));
    this.store.dispatch(leaveActionType.loadapprovedleaves());
  }
  getEndingleaves() {
    this.endingleaves$ = this.store.pipe(select(getleaves));
    this.store.dispatch(leaveActionType.loadEndingleaves());
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
