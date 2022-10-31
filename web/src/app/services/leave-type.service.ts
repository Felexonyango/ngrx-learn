import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { IDepartment } from '../model/department';
import { HTTPResponse } from '../model/HTTPResponse';
import { ILeaveType } from '../model/leave';
@Injectable({
  providedIn: 'root',
})
export class LeaveTypeService {
  constructor(private http: HttpClient) {}

  createLeavetype(
    leavetype: ILeaveType
  ): Observable<HTTPResponse<ILeaveType>> {
    return this.http.post<HTTPResponse<any>>(
      `${environment.server_Url}leavetype`,
      leavetype
    );
  }
  getLeaveType(): Observable<HTTPResponse<ILeaveType>> {
    return this.http.get<HTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype`
    );
  }
  getLeaveTypes(): Observable<ILeaveType[]> {
    return this.http.get<ILeaveType[]>(`${environment.server_Url}leavetype`)

  }

  getAllLeaveTypes(): Observable<HTTPResponse<ILeaveType[]>> {
    return this.http.get<HTTPResponse<ILeaveType[]>>(
      `${environment.server_Url}leavetype`
    );
  }

  getLeavetypeByID(id: string):Observable<ILeaveType> {
    return this.http.get<ILeaveType>(
      `${environment.server_Url}leavetype/${id}`
    );
  }
  deleteLeavetype(id: string): Observable<HTTPResponse<ILeaveType>> {
    return this.http.delete<HTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype/${id}`
    );
  }
  updateLeavetype(leaveType: ILeaveType): Observable<HTTPResponse<ILeaveType>> {
    const url = `${environment.server_Url}leavetype/${leaveType._id}`;
    return this.http.post<HTTPResponse<ILeaveType>>(url,leaveType);
  }

  //department

  getAllDepartments(): Observable<IDepartment[]> {
    return this.http
      .get<IDepartment[]>(`${environment.server_Url}department`)
  
  }

  createDepartments(
    departments: IDepartment
  ): Observable<HTTPResponse<IDepartment>> {
    return this.http.post<HTTPResponse<IDepartment>>(
      `${environment.server_Url}department`,
      departments
    )
  }
  updateDepartment(departmentId:string,department:IDepartment){
    return this.http.patch<HTTPResponse<IDepartment>>(
      `${environment.server_Url}department/${departmentId}`,
      department
    )
  }
  deleteDepartment(
    departmentId: any
  ): Observable<HTTPResponse<IDepartment>> {
    return this.http.delete<HTTPResponse<IDepartment>>(
      `${environment.server_Url}department/${departmentId}`
    )
  }


  getDepartmentById(departmentId: string): Observable<HTTPResponse<{
    department: IDepartment
    users: any 
  head:any}>> {
  return this.http.get<HTTPResponse<{
      department: IDepartment
      users: any
      head:any
    }>>(`${environment.server_Url}department/${departmentId}`)
}


}
