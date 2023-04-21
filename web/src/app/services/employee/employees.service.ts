import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {catchError, map, Observable, of, throwError} from 'rxjs'


import {environment} from '../../../environments/environment'

import {IAdminSummary, IEmployee, IEmployeeSummary} from '../../model/employees'
import { HTTPResponse } from '../../model/HTTPResponse'
import { ILeaves } from 'src/app/model/leave'

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private http: HttpClient) {}



  createEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(
      `${environment.server_Url}auth/create-user`,
      employee
    )
  }
  getAllEmployees(): Observable<HTTPResponse<IEmployee[]>> {
    return this.http.get<HTTPResponse<IEmployee[]>>(`${environment.server_Url}user/all`)
    
  }

  getEmployee(): Observable<HTTPResponse<IEmployee>> {
    return this.http.get<HTTPResponse<IEmployee>>(
      `${environment.server_Url}user`
    )
  }
  updateEmployee(employeeId: string, changes: Partial<IEmployee>): Observable<HTTPResponse<IEmployee>> {
    console.log(employeeId)
    const url = `${environment.server_Url}user/${employeeId}`;
    return this.http.patch<HTTPResponse<IEmployee>>(url, changes);
  }
  


  getEmployeeByID(employeeId: string): Observable<HTTPResponse<IEmployee>>{
    return this.http.get<HTTPResponse<IEmployee>>(
      `${environment.server_Url}user/${employeeId}`
    )
  }

  getMenu(): Observable<IEmployee> {
    return this.http.get< IEmployee>(
      `${environment.server_Url}menu/allMenuItems`
    )
  }

  deleteEmployee(id: string): Observable<HTTPResponse<IEmployee>> {
    return this.http.delete<HTTPResponse<IEmployee>>(
      `${environment.server_Url}user/${id}`
    )
  }

    
  getAdminSummary(): Observable<HTTPResponse<IAdminSummary>> {
    return this.http.get<HTTPResponse<IAdminSummary>>(
      `${environment.server_Url}department/department/total`
    )
  }

  getEmployeeSummary(): Observable<HTTPResponse<IEmployeeSummary>> {
    return this.http.get<HTTPResponse<IEmployeeSummary>>(
      `${environment.server_Url}department/user/total`
    )
  }
 




  deleteEmployeeType(employeeType_id): Observable<IEmployee> {
    return this.http.delete<IEmployee>(
      `${environment.server_Url}employeetype/${employeeType_id}`
    )

 
}
}

