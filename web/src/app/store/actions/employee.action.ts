import {Action} from '@ngrx/store'
import {EmployeeActionTypes} from '../actions/actionTypes'
import {IEmployee} from '../../model/employees'
export class Loademployees implements Action {
    readonly type = EmployeeActionTypes.LOAD_EMPLOYEES
  }
  export class LoademployeesSuccess implements Action {
    readonly type = EmployeeActionTypes.LOAD_EMPLOYEES_SUCCESS
    constructor(public payload: any[]) {}
  }
  export class LoademployeesFail implements Action {
    readonly type = EmployeeActionTypes.LOAD_EMPLOYEES_FAIL
    constructor(public payload: string) {}
  }
  export class LoadEmployee implements Action {
    readonly type =EmployeeActionTypes.LOAD_EMPLOYEE;
    constructor(public payload:any) {}
  }
  export class Loademployeesucess implements Action {
    readonly type =EmployeeActionTypes.LOAD_EMPLOYEE_SUCCESS;
    constructor(public payload:IEmployee) {}
  }
  export class Loademployeefail implements Action {
    readonly type =EmployeeActionTypes.LOAD_EMPLOYEE_FAIL;
    constructor(public payload:any) {}
  }
  export class createemployee implements Action {
    readonly type =EmployeeActionTypes.CREATE_EMPLOYEE;
    constructor(public payload:IEmployee) {}
  }

  export class createemployeesucess implements Action {
    readonly type =EmployeeActionTypes.CREATE_EMPLOYEE_SUCCESS;
    constructor(public payload:IEmployee) {}
  }
  export class createemployeefail implements Action {
    readonly type =EmployeeActionTypes.CREATE_EMPLOYEE_FAIL;
    constructor(public payload:any) {}
  }


export class UpdateEmployee implements Action {
    readonly type =EmployeeActionTypes.UPLOAD_EMPLOYEE;
    constructor(public payload: IEmployee) {}
  }
  export class UpdateEmployeeSuccess implements Action {
    readonly type = EmployeeActionTypes.UPLOAD_EMPLOYEE_SUCESS;
    constructor(public payload: IEmployee) {}
  }
  export class UpdateEmployeeFail implements Action {
    readonly type =EmployeeActionTypes.UPLOAD_EMPLOYEE_FAIL;
    constructor(public payload: string) {}
  }
  
  export class DeleteEmployee implements Action {
    readonly type = EmployeeActionTypes.DELETE_EMPLOYEE
    constructor(public payload: any) {}
  }
  export class DeleteEmployeeSuccess implements Action {
    readonly type = EmployeeActionTypes.DELETE_EMPLOYEE_SUCCESS ;
    constructor(public payload: any) {}
  }
  export class DeleteEmployeeFail implements Action {
    readonly type = EmployeeActionTypes.DELETE_EMPLOYEE_FAIL
    constructor(public payload: string) {}
  }


