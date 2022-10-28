import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable, of} from 'rxjs'


import {environment} from '../../environments/environment'

import {IEmployee} from '../model/employees'
import { HTTPResponse } from '../model/HTTPResponse'

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // employee = Employees

  constructor(private http: HttpClient) {}



  createEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(
      `${environment.server_Url}user`,
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
  updateEmployee(employee: IEmployee):Observable<HTTPResponse<IEmployee>> {
    const url = `${environment.server_Url}leave/${employee._id}`;
    return this.http.post<HTTPResponse<IEmployee>>(url,employee)
  }


  getEmployeeByID(employeeId: any): Observable<IEmployee> {
    return this.http.get<IEmployee>(
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
 




  deleteEmployeeType(employeeType_id): Observable<IEmployee> {
    return this.http.delete<IEmployee>(
      `${environment.server_Url}employeetype/${employeeType_id}`
    )

 
}
}

