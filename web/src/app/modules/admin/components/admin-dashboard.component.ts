import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Paginator } from 'primeng/paginator';
import { Subscription, Observable } from 'rxjs';
import { IAdminSummary } from 'src/app/model/employees';
import { ILeaves, Status } from 'src/app/model/leave';
import { EmployeeService } from 'src/app/services/employee/employees.service';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { leaveActionType } from 'src/app/store/actions/leave/leave.action';
import { LeaveState } from 'src/app/store/reducer/leave/leaveReducer';
import { getleaves } from 'src/app/store/selector/leave/leave.selector';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  subscription = new Subscription()

  employeeSummary:IAdminSummary


  leaveRequests$: Observable<ILeaves[]>
  pendingleaves$: Observable<ILeaves[]>



  @ViewChild('paginator', { static: true }) paginator: Paginator;

  leaveTableColumns: string[] = [
    'Employee Name',
    'leaveType',
    
    'startDate',
    'EndDate',
    'status',
    'Action'
    
  ];
  leaveStatus = Status;
  constructor(
    private store: Store<LeaveState>,
    private router: Router,
    private employeeservice:EmployeeService,
    private leaveService:LeaveService
    
    ) {}

  ngOnInit(): void {
    this.getEmployeeSummarys()
    this.getPendingleaves();
 
    
    
  }

  getPendingleaves() {
    this.pendingleaves$ = this.store.pipe(select(getleaves));
    this.store.dispatch(leaveActionType.loadpendingleaves());
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
    this.getPendingleaves()
  }

  getEmployeeSummarys(){
  this.subscription.add(this.employeeservice.getAdminSummary().subscribe((res)=>{
    this.employeeSummary=res.result
      console.log(this.employeeSummary, "hello")
  }
   
   
    ))
  }

   approveStatus(leaveId,leaveStatus:Status){
    this.subscription.add(
      this.leaveService.approveLeave(leaveId,{status: leaveStatus }).subscribe({
        next:(res)=>{ 
          this.getPendingleaves()
        }
      
      })
    )


   }
  }


