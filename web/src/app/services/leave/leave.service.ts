import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {
  ILeaves,
  ILeaveType,
  INote,
  IHoliday,
  ILeavesummary,
} from '../../model/leave';
import { HTTPResponse } from 'src/app/model/HTTPResponse';
@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(private http: HttpClient) {}

  getLeaveTypes<T>(): Observable< T[]> {
    return this.http
      .get<HTTPResponse<T[]>>(`${environment.server_Url}leavetype`)
      .pipe(
        map((res) => {
          return res.result;
        })
      );
  }
  

  getLeaveRequestsByUser(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(
      `${environment.server_Url}leave`
    );
  }

  getLeaveRequestDetail<T>(leaveId: T): Observable<HTTPResponse<ILeaves>> {
    return this.http
      .get<HTTPResponse<ILeaves>>(`${environment.server_Url}leave/${leaveId}`)
      .pipe<HTTPResponse<ILeaves>>(
        map((res) => {
          return res;
        })
      );
  }

  AdminApprovedLeaveRequest(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(
      `${environment.server_Url}leave/admin/approved`
    );
  }
  EmployeeApprovedLeaveRequest(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(
      `${environment.server_Url}leave/user/approved`
    );
  }

  pendingLeaveRequests(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(
      `${environment.server_Url}leave/admin/pending`
    );
  }

  deleteLeaveRequest(id: string): Observable<HTTPResponse<ILeaves>> {
    return this.http.delete<HTTPResponse<ILeaves>>(
      `${environment.server_Url}leave/${id}`
    );
  }

  getAllNewLeaveRequests(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(
      `${environment.server_Url}leave/admin/all`
    );
  }



  approveLeave(
    leaveId: string,
    leave: Partial<ILeaves>
  ): Observable<HTTPResponse<Partial<ILeaves>>> {
    return this.http.post<HTTPResponse<Partial<ILeaves>>>(
      `${environment.server_Url}leave/${leaveId}`,
      leave
    );
  }

  getAllLeaves(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(
      `${environment.server_Url}leave/admin/all`
    );
  }
  getleaveRequests(employeeId: string): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(
      `${environment.server_Url}supervisor/${employeeId}`
    );
  }

  createLeaveRequest(leave: ILeaves): Observable<HTTPResponse<ILeaves>> {
    return this.http.post<HTTPResponse<ILeaves>>(
      `${environment.server_Url}leave`,
      leave
    );
  }
  updateLeaveRequest<T>(
    leaveId: T,
    ileavetype: T
  ): Observable<HTTPResponse<T>> {
    return this.http.post<HTTPResponse<T>>(
      `${environment.server_Url}leave/${leaveId}`,
      ileavetype
    );
  }

  getLeaveSummary(): Observable<HTTPResponse<ILeaves>> {
    return this.http.get<HTTPResponse<ILeaves>>(
      `${environment.server_Url}leave/summary`
    );
  }
  employeeleavesummary(
    employeeId: string
  ): Observable<HTTPResponse<ILeavesummary>> {
    return this.http.get<HTTPResponse<ILeavesummary>>(
      `${environment.server_Url}supervisor/usersummary/${employeeId}`
    );
  }

  EndingLeaveRequest(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(
      `${environment.server_Url}supervisor/leaves/ending`
    );
  }
}
