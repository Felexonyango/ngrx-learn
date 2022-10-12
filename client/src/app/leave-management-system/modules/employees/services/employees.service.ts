import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, of} from 'rxjs'
import {IApiHTTPResponse} from 'src/app/leave-management-system/models/api.response.model'

import {environment} from 'src/environments/environment'

import {IEmployee, IUserRole} from '../models/employeeModel'

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  // employee = Employees

  constructor(private http: HttpClient) {}

  // getEmployee(): Observable<any>{
  //   return of(this.employee)
  // }

  createEmployee(employee: any): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.post<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user`,
      employee
    )
  }
  getAllEmployees(): Observable<IApiHTTPResponse<[]>> {
    return this.http.get<IApiHTTPResponse<[]>>(
      `${environment.server_Url}user/all`
    )
  }

  getEmployee(): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.get<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user`
    )
  }
  updateEmployee(
    employeeId: any,
    employee: any
  ): Observable<IApiHTTPResponse<any>> {
    return this.http.post<IApiHTTPResponse<any>>(
      `${environment.server_Url}leave/${employeeId}`,
      employee
    )
  }

  uploadphoto(
    empId: string,
    file: File
  ): Observable<IApiHTTPResponse<IEmployee>> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user/file/${empId}`,
      formData
    )
  }
  getEmployeeByID(employeeId: any): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.get<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user/${employeeId}`
    )
  }

  getMenu(): Observable<IApiHTTPResponse<any>> {
    return this.http.get<IApiHTTPResponse<any>>(
      `${environment.server_Url}menu/allMenuItems`
    )
  }
  getEmployeeImage(
    employeeId: string
  ): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.get<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user/profile/${employeeId}`
    )
  }
  deleteEmployee(id: string): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.delete<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user/${id}`
    )
  }
 

  assignUserRole(role: IUserRole): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.post<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user/role/${role._id}`,
      {role: role.role}
    )
  }

  unAssignUserRole(role: IUserRole): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.post<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}user/removerole/${role._id}`,
      {role: role.role}
    )
  }


  deleteEmployeeType(employeeType_id): Observable<IApiHTTPResponse<IEmployee>> {
    return this.http.delete<IApiHTTPResponse<IEmployee>>(
      `${environment.server_Url}employeetype/${employeeType_id}`
    )

 
}
}

