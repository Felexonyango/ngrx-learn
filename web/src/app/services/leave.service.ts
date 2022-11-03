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
    return this.http
      .get<HTTPResponse<ILeaves[]>>(`${environment.server_Url}leave`)
      .pipe<HTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
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
      .pipe<HTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }

  deleteLeaveRequest(id: string): Observable<HTTPResponse<ILeaves>> {
    return this.http.delete<HTTPResponse<ILeaves>>(
      `${environment.server_Url}leave/${id}`
    )
  }

 
getAllNewLeaveRequest(): Observable<HTTPResponse<ILeaves[]>> {
    return this.http
      .get<HTTPResponse<ILeaves[]>>(`${environment.server_Url}supervisor/alldepartments`)
      .pipe<HTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
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
      .pipe<HTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }
  createLeaveRequest(leave: ILeaves): Observable<HTTPResponse<ILeaves>> {
    return this.http.post<HTTPResponse<any>>(
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

  //Leave types
  createLeavetype(
    ileavetype: ILeaveType
  ): Observable<HTTPResponse<ILeaveType>> {
    return this.http.post<HTTPResponse<any>>(
      `${environment.server_Url}leavetype`,
      ileavetype
    )
  }
  getLeaveType(): Observable<HTTPResponse<ILeaveType>> {
    return this.http.get<HTTPResponse<any>>(
      `${environment.server_Url}leavetype`
    )
  }
  getLeaveTypes(): Observable<ILeaveType[]> {
    return this.http
      .get<HTTPResponse<any>>(`${environment.server_Url}leavetype`)
      .pipe(
        map((res) => {
          return res.result
        })
      )
  }

  getAllLeaveTypes(): Observable<HTTPResponse<ILeaveType[]>> {
    return this.http.get<HTTPResponse<ILeaveType[]>>(
      `${environment.server_Url}leavetype`
    )
  }

  getLeavetypeByID(id: string) {
    return this.http.get<HTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype/${id}`
    )
  }
  deleteLeavetype(id: string): Observable<HTTPResponse<ILeaveType>> {
    return this.http.delete<HTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype/${id}`
    )
  }
  updateLeavetype(
    id: string,
    ileavetype: ILeaveType
  ): Observable<HTTPResponse<ILeaveType>> {
    return this.http.post<HTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype/${id}`,
      ileavetype
    )
  }

  // getLeaveTypes() {
  //     return leaveTypes;
  // }

  // getHolidays() {
  //     return companyHolidays;
  // }
  // getDepartments() {
  //     return Departments;
  // }
 
  getAllDepartments(): Observable<IDepartment[]> {
    return this.http
      .get<HTTPResponse<IDepartment[]>>(
        `${environment.server_Url}department`
      )
      .pipe(
        map((res) => {
          return res.result
        })
      )
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

 
  getHolidays(): Observable<HTTPResponse<IHoliday[]>> {
    return this.http.get<HTTPResponse<IHoliday[]>>(
      `${environment.server_Url}holiday`
    )
  }

  createHolidays(holidays: any): Observable<HTTPResponse<any>> {
    return this.http.post<HTTPResponse<any>>(
      `${environment.server_Url}holiday`,
      holidays
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

  getProfileImage(): Observable<Blob> {
    return this.http.get(`${environment.server_Url}user/userprofile`, {
      responseType: 'blob',
    })
  }
  getProfileById(employeeId: string): Observable<Blob> {
    return this.http.get(
      `${environment.server_Url}user/profile/${employeeId}`,
      {
        responseType: 'blob',
      }
    )
  }
  getDepartmentById(departmentId: string): Observable<HTTPResponse<{
      department: IDepartment
      users: any 
    head:any}>> {
    return this.http.get<
      HTTPResponse<{
        department: IDepartment
        users: any
        head:any
      }>>(`${environment.server_Url}department/${departmentId}`)
  }


  getHolidayById(holidayId:string): Observable<HTTPResponse<IHoliday>> {
    return this.http.get<HTTPResponse<IHoliday>>(
      `${environment.server_Url}holiday/${holidayId}`
    )
  }

  updateHoliday(holidayId:string, holiday:IHoliday): Observable<HTTPResponse<IHoliday>> {
    return this.http.post<HTTPResponse<IHoliday>>(
      `${environment.server_Url}holiday/${holidayId}`,
      holiday
    )
  }

}






