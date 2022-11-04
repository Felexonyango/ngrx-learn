import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import {Observable, of} from 'rxjs'


import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { IDepartment } from '../model/department';
import { HTTPResponse } from '../model/HTTPResponse';
import { ILeaves, ILeaveType, INote, IHoliday, ILeavesummary } from '../model/leave';
@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }


  getLeaveTypes(): Observable<ILeaveType[]> {
    return this.http
      .get<HTTPResponse<any>>(`${environment.server_Url}leavetype`)
      .pipe(
        map((res) => {
          return res.result
        })
      )
  }
  approveLeaveRequest(leaveId: any): Observable<HTTPResponse<ILeaves>> {
    return this.http.post<HTTPResponse<ILeaves>>(
      `${environment.server_Url}supervisor/approveleave/${leaveId}`,
      leaveId
    )
  }
  declineLeaveRequest(leaveId: any): Observable<HTTPResponse<ILeaves>> {
    return this.http.post<HTTPResponse<ILeaves>>(
      `${environment.server_Url}supervisor/CANCELLEAVE/${leaveId}`,
      leaveId
    )
  }

  getRemainingDays(): Observable<HTTPResponse<any>> {
    return this.http.get<HTTPResponse<any>>(
      `${environment.server_Url}leave/leavetypes`
    )
  }
  getLeaveRequestsByUser(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(`${environment.server_Url}leave`)
     
  }
  getleaveRequests(
    employeeId: string
  ): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(
      `${environment.server_Url}supervisor/${employeeId}`
    )
  }


  getLeaveRequestDetail(leaveId: any): Observable<HTTPResponse<ILeaves>> {
    return this.http
      .get<HTTPResponse<ILeaves>>(
        `${environment.server_Url}leave/${leaveId}`
      )
      .pipe<HTTPResponse<ILeaves>>(
        map((res) => {
          return res
        })
      )
  }

  AdminApprovedLeaveRequest(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http
      .get<HTTPResponse<ILeaves[]>>(
        `${environment.server_Url}supervisor/leaves/upcoming`
      )
      .pipe<HTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }
  EmployeeApprovedLeaveRequest(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(
      `${environment.server_Url}leave/upcoming`
    )
  }

  getUpcomingLeaveRequestById(
    id: string
  ): Observable<HTTPResponse<ILeaves>> {
    return this.http.get<HTTPResponse<ILeaves>>(
      `${environment.server_Url}leave/${id}`
    )
  }
  pendingLeaveRequests(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http
      .get<HTTPResponse<ILeaves[]>>(
        `${environment.server_Url}leave/pending`
      )
      
  }

  deleteLeaveRequest(id: string): Observable<HTTPResponse<ILeaves>> {
    return this.http.delete<HTTPResponse<ILeaves>>(
      `${environment.server_Url}leave/${id}`
    )
  }

 
getAllNewLeaveRequests(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http.get<HTTPResponse<ILeaves[]>>(`${environment.server_Url}supervisor/alldepartments`)
   
  }
  getDepartmentLeaveRequests(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http
      .get<HTTPResponse<ILeaves[]>>(`${environment.server_Url}supervisor`)
      .pipe<HTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }


  getAllLeaves(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http
      .get<HTTPResponse<ILeaves[]>>(
        `${environment.server_Url}supervisor/allleaves`
      )
     
  }
  createLeaveRequest(leave: ILeaves): Observable<HTTPResponse<ILeaves>> {
    return this.http.post<HTTPResponse<ILeaves>>(
      `${environment.server_Url}leave`,
      leave
    )
  }
  updateLeaveRequest(
    leaveId: any,
    ileavetype: ILeaveType
  ): Observable<HTTPResponse<any>> {
    return this.http.post<HTTPResponse<any>>(
      `${environment.server_Url}leave/${leaveId}`,
      ileavetype
    )
  }
  addNote(leaveId: string, note: INote): Observable<HTTPResponse<INote>> {
    return this.http.post<HTTPResponse<INote>>(
      `${environment.server_Url}note/${leaveId}`,
      note
    )
  }
  getNote(leaveId: string): Observable<HTTPResponse<INote[]>> {
    return this.http.get<HTTPResponse<INote[]>>(
      `${environment.server_Url}note/${leaveId}`
    )
  }
  MakeRole(departmentId: string, head:any): Observable<HTTPResponse<[]>> {
    return this.http.patch<HTTPResponse<[]>>(
      `${environment.server_Url}department/${departmentId}`,
       head
    )
  }

 
  getLeaveSummary(): Observable<HTTPResponse<ILeaves>> {
    return this.http.get<HTTPResponse<ILeaves>>(
      `${environment.server_Url}leave/summary`
    )
  }
  employeeleavesummary(
    employeeId: string
  ): Observable<HTTPResponse<ILeavesummary>> {
    return this.http.get<HTTPResponse<ILeavesummary>>(
      `${environment.server_Url}supervisor/usersummary/${employeeId}`
    )
  }
  deleteHoliday(holidayId: string): Observable<HTTPResponse<IHoliday>> {
    return this.http.delete<HTTPResponse<IDepartment>>(
      `${environment.server_Url}holiday/${holidayId}`
    )
  }

}