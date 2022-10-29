import { Component, OnInit } from '@angular/core';
import { select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/model/employees';
//import { getEmployeeById, selectEntity } from 'src/app/store/selector/employee.selector';
import {  State } from 'src/app/store/reducer/employeeReducer';
import { ActivatedRoute } from '@angular/router';
import { getProductById } from 'src/app/store/selector/employee.selector';
//import { SelectedEmployeeEntry } from 'src/app/store/selector/employee.selector';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

   employee:Observable<IEmployee>

  
  constructor(
    private store: Store<State>,
    ) { }

  ngOnInit(): void {
    this.employee = this.store.select(getProductById);
}

 
 

 
}

