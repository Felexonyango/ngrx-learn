import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IDepartment } from '../../model/department';
import { HTTPResponse } from '../../model/HTTPResponse';
import { ILeaveType } from '../../model/leave';
@Injectable({
  providedIn: 'root',
})
export class LeaveTypeService {
  constructor(private http: HttpClient) {}

  createLeavetype(leavetype: ILeaveType): Observable<HTTPResponse<ILeaveType>> {
    return this.http.post<HTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype/create`,
      leavetype
    );
  }
  getLeaveType(): Observable<HTTPResponse<ILeaveType>> {
    return this.http.get<HTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype`
    );
  }
  getLeaveTypes(): Observable<ILeaveType[]> {
    return this.http.get<ILeaveType[]>(`${environment.server_Url}leavetype`);
  }

  getAllLeaveTypes(): Observable<HTTPResponse<ILeaveType[]>> {
    return this.http.get<HTTPResponse<ILeaveType[]>>(
      `${environment.server_Url}leavetype`
    );
  }

  getLeavetypeByID(id: string): Observable<HTTPResponse<ILeaveType>> {
    return this.http.get<HTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype/${id}`
    );
  }
  deleteLeavetype(id: string): Observable<HTTPResponse<ILeaveType>> {
    return this.http.delete<HTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype/${id}`
    );
  }
  updateLeavetype(leaveTypeId:string,
    leaveType:ILeaveType): Observable<HTTPResponse<ILeaveType>> {
    const url = `${environment.server_Url}leavetype/${leaveTypeId}`;
    return this.http.patch<HTTPResponse<ILeaveType>>(url, leaveType);
  }

  getAllDepartments<T>(): Observable<T[]> {
    return this.http
      .get<HTTPResponse<T[]>>(`${environment.server_Url}department`)
      .pipe(
        map((res) => {
          return res.result;
        })
      );
  }

  createDepartments(
    department: IDepartment
  ): Observable<HTTPResponse<IDepartment>> {
    return this.http.post<HTTPResponse<IDepartment>>(
      `${environment.server_Url}department`,
      department
    );
  }
  updateDepartment(departmentId:string, department:{}) {
    const url = `${environment.server_Url}department/${departmentId}`;
    return this.http.patch<HTTPResponse<IDepartment>>(url, department);
  }
  deleteDepartment<T>(departmentId: T): Observable<HTTPResponse<IDepartment>> {
    return this.http.delete<HTTPResponse<IDepartment>>(
      `${environment.server_Url}department/${departmentId}`
    );
  }

  getDepartment(departmentId:string): Observable<HTTPResponse<IDepartment>> {
    return this.http.get<HTTPResponse<IDepartment>>(`${environment.server_Url}department/${departmentId}`);
  }
}
