import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/model/employees';
import { EmployeeState, getEmployees } from 'src/app/store/reducer/employeeReducer';
import * as EmployeeAction from '../../../../store/actions/employee.action'
@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent implements OnInit {

  public employes$: Observable<IEmployee[]>;
  constructor(private store: Store<EmployeeState>) {}


  ngOnInit(): void {
  this.initializeValues()
    this.store.dispatch(new EmployeeAction.Loademployees());
  }

  private initializeValues(): void {
  
    this.store.pipe(select(getEmployees)).subscribe((data)=>{
      console.log(data)
    }) 
   
  
  }
}
