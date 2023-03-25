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

  createLeavetype<T>(leavetype: T): Observable<HTTPResponse<T|undefined>> {
    return this.http.post<HTTPResponse<T>>(
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

  getLeavetypeByID(id: string): Observable<ILeaveType> {
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
    return this.http.post<HTTPResponse<ILeaveType>>(url, leaveType);
  }

  //department

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
  updateDepartment(department: IDepartment) {
    const url = `${environment.server_Url}department/${department._id}`;
    return this.http.patch<HTTPResponse<IDepartment>>(url, department);
  }
  deleteDepartment<T>(departmentId: T): Observable<HTTPResponse<IDepartment>> {
    return this.http.delete<HTTPResponse<IDepartment>>(
      `${environment.server_Url}department/${departmentId}`
    );
  }

  getDepartmentById<T>(departmentId: T): Observable<
    HTTPResponse<{
      department: IDepartment;
      users: T;
      head: T;
    }>
  > {
    return this.http.get<
      HTTPResponse<{
        department: IDepartment;
        users: T;
        head: T;
      }>
    >(`${environment.server_Url}department/${departmentId}`);
  }
}
