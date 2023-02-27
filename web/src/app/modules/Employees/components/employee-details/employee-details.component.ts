import { Component, OnInit } from '@angular/core';
import { select, Store} from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IEmployee } from 'src/app/model/employees';
import { ILeaves } from 'src/app/model/leave';
import { LeaveService } from 'src/app/services/leave/leave.service';

import {  State } from 'src/app/store/reducer/employee/employeeReducer';
import { getEmployeeById } from 'src/app/store/selector/employee/employee.selector';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
subscription=new Subscription()
leaves:ILeaves[]=[]
   employee:Observable<IEmployee>
    
  constructor(
    private  leaveService:LeaveService,
    private store: Store<State>,
    ) { }

  ngOnInit(): void {
    
    this.employee = this.store.select(getEmployeeById);
}


 
 

 
}

