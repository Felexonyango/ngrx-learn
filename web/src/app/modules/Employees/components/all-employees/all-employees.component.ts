import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Paginator } from 'primeng/paginator';
import { Observable, Subscription } from 'rxjs';
import { IEmployee } from 'src/app/model/employees';
import { EmployeeActionTypes } from 'src/app/store/actions/employee/employee.action';
import { getEmployees } from '../../../../store/selector/employee/employee.selector';
import { State } from 'src/app/store/reducer/employee/employeeReducer';
import { routerCancelAction } from '@ngrx/router-store';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee/employees.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllEmployeesComponent implements OnInit {
  employees$: Observable<IEmployee[]>;
  employees: IEmployee[];
  subscription=new  Subscription()
  
  constructor(
    private store: Store<State>, 
    private router: Router,
    private employeeservice:EmployeeService
    ) {}

  @ViewChild('paginator', { static: true }) paginator: Paginator;

  EmployeesTableColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'department',
    'startDate',
  
  ];

  ngOnInit(): void {
    this.employees$ = this.store.pipe(select(getEmployees));
    this.store.dispatch(EmployeeActionTypes.LoadEmployees());
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onView(id: string) {
    this.router.navigate(['/employees/employee', id]);
  }
  onDeleteEmployee(id: string) {
    this.store.dispatch(EmployeeActionTypes.deleteEmployee({ id }));
  }

  onEditBtnClick(id: string) {
    this.router.navigate(['/employees/employee-edit', id]);
  }


}
