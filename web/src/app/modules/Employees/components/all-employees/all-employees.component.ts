import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Paginator } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/model/employees';
import { EmployeeActionTypes } from 'src/app/store/actions/employee.action';
import {getEmployees } from '../../../../store/selector/employee.selector'
import {  State } from 'src/app/store/reducer/employeeReducer';
import { routerCancelAction } from '@ngrx/router-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent implements OnInit {
   employees$: Observable<IEmployee[]>;
  constructor(
    private store: Store<State>,
    private router: Router
    ) {}
  
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  EmployeesTableColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'startDate',
    'Action'
    
  ];

  ngOnInit(): void {
    this.employees$ = this.store.pipe(select(getEmployees))
    this.store.dispatch(EmployeeActionTypes.LoadEmployees())
  }

  onView(id:string){
     this.router.navigate([ '/employees/employee',id])

  }
  onDeleteEmployee(id: string) {
  
      this.store.dispatch(EmployeeActionTypes.deleteEmployee({ id }));
      
    
  }

  onEditBtnClick(id:string) {
    this.router.navigate(['/employees/employee-edit',id]);
  }
  
  
}
