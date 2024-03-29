import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store} from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Observable, Subscription } from 'rxjs';
import { IEmployee } from 'src/app/model/employees';
import { ILeaves } from 'src/app/model/leave';
import { EmployeeService } from 'src/app/services/employee/employees.service';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { leaveActionType } from 'src/app/store/actions/leave/leave.action';

import {  State } from 'src/app/store/reducer/employee/employeeReducer';
import { LeaveState } from 'src/app/store/reducer/leave/leaveReducer';
import { getEmployeeById } from 'src/app/store/selector/employee/employee.selector';
import { getleaves } from 'src/app/store/selector/leave/leave.selector';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsComponent implements OnInit {
subscription=new Subscription()
leaves:ILeaves[]=[]
   employee:IEmployee
   Ileaves: ILeaves[];

  
   id:any
   imageToShow: any;

   display: boolean;
   initials: string;
   
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  leaveTableColumns: string[] = [
    'leaveType',
    'startDate',
    'EndDate',
    'status',
  ];
  constructor(
    private leavService: LeaveService,
    private router: Router,
    private  employeeService: EmployeeService,
    private primengConfig: PrimeNGConfig,
    private leavestore: Store<LeaveState>,
    private  leaveService:LeaveService,
    private store: Store<State>,
    private ActivatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    
    // this.employee = this.store.select(getEmployeeById);
    this.primengConfig.ripple = true;

   this.getEmployeeFromParam()
}


ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

getEmployeeFromParam(): void {
  this.subscription.add(
      this.ActivatedRoute.params.subscribe({
          next: (params) => {
              const employeeById = params['employeeId'];
              this.getEmployeeId(employeeById)
              console.log(employeeById)
              
          },
      })
  );
}
getEmployeeId(employeeById:string){
  this.subscription.add(
     this.employeeService.getEmployeeByID(employeeById).subscribe({
      next:(res)=>{
  
        this.employee=res.result
        console.log(this.employee.leave)
        
      }
     })
  )
}
 
getLeaveDetails <T>(id:T){
  this.subscription.add(
    this.leavService.getLeaveRequestDetail(id).subscribe((res) => {})
  );
}

//  getLeaveHistroy() {
//   this.Ileaves = this.leavestore.pipe(select(getleaves));
//   this.leavestore.dispatch(leaveActionType.loadleavesByuser());
// }

handleSelect(id: string) {
  this.router.navigate([`/leave/leaves/details/${id}`]);
}
updateLeave(id: string) {
  this.router.navigate([`/leave/leaves/apply/${id}`]);
}


deleteLeaveDialog() {
  this.display = true;
}
cancelDeleteLeaveDialog() {
  this.display = false;
}

onDeleteleave(id: any) {
  this.store.dispatch(leaveActionType.deleteleave({ id}))
}
onEditBtnClick(id: any) {}

onView(id: any) {
  this.router.navigate([`/leave/leave-details/${id}`]);
}
 

 
}

