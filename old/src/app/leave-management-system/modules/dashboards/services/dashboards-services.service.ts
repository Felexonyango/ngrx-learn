import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {IApiHTTPResponse} from 'src/app/leave-management-system/models/api.response.model'

import {environment} from 'src/environments/environment'
import {IEmployee, IemployeeData, IEmployeeSummary} from '../../employees/models/employeeModel'

@Injectable({
  providedIn: 'root',
})
export class DashboardsServicesService {


  constructor(private http: HttpClient) {}
  createEmployee(employee: IEmployee): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.post<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user`,
      employee
    )
  }

  getEmployeeId(employeeId:string): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.get<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user/${employeeId}`
    )
  }
  getEmployee(): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.get<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user`
    )
  }

  getEmployeeByID(employeeId: any): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.get<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}supervisor/${employeeId}`
    )
  }
  // getAllDepartments(): Observable<IDepartment[]> {
  //   return this.http
  //     .get<IApiHTTPResponse<IDepartment[]>>(
  //       `${environment.server_Url}department`
  //     )
  //     .pipe(
  //       map((res) => {
  //         return res.result
  //       })
  //     )
  // }
  getAllEmployees(): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.get<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user/all`
    )
  }
  public deleteEmployee(employeeId: any) {
    return this.http.delete(`${environment.server_Url}${employeeId}`)
  }
 
  
   getEmployeeSummary(): Observable<IApiHTTPResponse<IEmployeeSummary[]>> {
    return this.http.get<IApiHTTPResponse<IEmployeeSummary[]>>(
      `${environment.server_Url}department`
    )
  }

  getEmployeeInfo(): Observable<IApiHTTPResponse<IemployeeData>> {
    return this.http.get<IApiHTTPResponse<IemployeeData>>(
      `${environment.server_Url}user/summary`
    )
  }
}
