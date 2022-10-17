
export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login failure',
  LOGOUT = '[Auth] Logout',
}

export enum EmployeeActionTypes {
  LOAD_EMPLOYEES  = '[Employee] load employees',
  LOAD_EMPLOYEES_SUCCESS = '[employee] Load employee Success',
  LOAD_EMPLOYEES_FAIL = '[employee] Load employee Fail',
  
  LOAD_EMPLOYEE  = '[Employee] load employee',
  LOAD_EMPLOYEE_SUCCESS  = '[Employee] load employee success',
  LOAD_EMPLOYEE_FAIL = '[ employee] Load employee Fail',

  CREATE_EMPLOYEE = '[Employee] create employees',
  CREATE_EMPLOYEE_SUCCESS = '[employee] Create employees Success',
  CREATE_EMPLOYEE_FAIL = '[employee] Create employees Fail',
  DELETE_EMPLOYEE = '[Employee] delete employee',
  DELETE_EMPLOYEE_SUCCESS = '[employee] Delete employee Success',
  DELETE_EMPLOYEE_FAIL = '[employee] Delete employee Fail',
  UPLOAD_EMPLOYEE = '[Employee] upload',
  UPLOAD_EMPLOYEE_SUCESS = '[Employee] upload employee success',
  UPLOAD_EMPLOYEE_FAIL = '[employee] upload employee fail'

}

