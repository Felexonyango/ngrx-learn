import { Action } from '@ngrx/store';
import { EmployeeActionTypes } from '../actions/actionTypes';
import { IEmployee } from '../../model/employees';
import { Update } from '@ngrx/entity';
export class Loademployees implements Action {
  readonly type = EmployeeActionTypes.LOAD_EMPLOYEES;
  
}
export class LoademployeesSuccess implements Action {
  readonly type = EmployeeActionTypes.LOAD_EMPLOYEES_SUCCESS;
  constructor(public payload: IEmployee[]) {}
}
export class LoademployeesFail implements Action {
  readonly type = EmployeeActionTypes.LOAD_EMPLOYEES_FAIL;
  constructor(public payload: string) {}
}


export class createEmployee implements Action {
  readonly type = EmployeeActionTypes.CREATE_EMPLOYEE;
  constructor(public payload: IEmployee) {}
}

export class createEmployeesucess implements Action {
  readonly type = EmployeeActionTypes.CREATE_EMPLOYEE_SUCCESS;
  constructor(public payload: IEmployee) {}
}
export class createEmployeefail implements Action {
  readonly type = EmployeeActionTypes.CREATE_EMPLOYEE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateEmployee implements Action {
  readonly type = EmployeeActionTypes.UPDATE_EMPLOYEE;
  constructor(public payload: IEmployee) {}
}
export class UpdateEmployeeSuccess implements Action {
  readonly type = EmployeeActionTypes.UPDATE_EMPLOYEE_SUCESS;
  constructor(
    public id:string,
    public payload: Update<IEmployee>
    ) {}
}
export class UpdateEmployeeFail implements Action {
  readonly type = EmployeeActionTypes.UPDATE_EMPLOYEE_FAIL;
  constructor(public payload: string) {}
}

export class DeleteEmployee implements Action {
  readonly type = EmployeeActionTypes.DELETE_EMPLOYEE;
  constructor(public payload: any) {}
}
export class DeleteEmployeeSuccess implements Action {
  readonly type = EmployeeActionTypes.DELETE_EMPLOYEE_SUCCESS;
  constructor(public payload: any) {}
}
export class DeleteEmployeeFail implements Action {
  readonly type = EmployeeActionTypes.DELETE_EMPLOYEE_FAIL;
  constructor(public payload: string) {}
}


export type Actions =
Loademployees|
LoademployeesFail|
LoademployeesSuccess|
createEmployee|
createEmployeefail|
createEmployeesucess|
UpdateEmployee|
UpdateEmployeeFail|
UpdateEmployeeSuccess|
DeleteEmployee|
DeleteEmployeeFail|
DeleteEmployeeSuccess
  