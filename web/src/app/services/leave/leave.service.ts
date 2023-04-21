import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { map, retry } from 'rxjs/operators';
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

  getLeaveTypes(): Observable<ILeaveType[]> {
    return this.http
      .get<HTTPResponse<ILeaveType[]>>(`${environment.server_Url}leavetype`)
      .pipe(
        map((res) => {
          return res.result;
        })
      );
  }

  getLeaveType(): Observable<HTTPResponse<ILeaveType[]>> {
    return this.http.get<HTTPResponse<ILeaveType[]>>(
      `${environment.server_Url}leavetype`
    );
  }
  getLeaveTypeById(leaveTypeId: string): Observable<HTTPResponse<ILeaveType>> {
    return this.http.get<HTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype${leaveTypeId}`
    );
  }

  updateLeavetype(
    leaveTypeId: string,
    leaveType: {}
  ): Observable<HTTPResponse<ILeaveType>> {
    return this.http.post<HTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype${leaveTypeId}`,
      leaveType
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
      `${environment.server_Url}leave/approve/${leaveId}`,
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

  createLeaveRequest(leave: {}): Observable<HTTPResponse<ILeaves>> {
    return this.http.post<HTTPResponse<ILeaves>>(
      `${environment.server_Url}leave`,
      leave
    );
  }
  updateLeaveRequest(
    leaveId: string,
    leaves: {}
  ): Observable<HTTPResponse<ILeaves>> {
    return this.http.post<HTTPResponse<ILeaves>>(
      `${environment.server_Url}leave/${leaveId}`,
      leaves
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
