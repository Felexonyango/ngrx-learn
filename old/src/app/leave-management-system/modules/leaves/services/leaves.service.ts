import {HttpClient, HttpResponseBase} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, of} from 'rxjs'

import {leaveDays} from 'src/app/leave-management-system/models/data.model'
import {
  ILeaves,
  ILeavesummary,
  INote,
} from 'src/app/leave-management-system/models/leavehistory.model'
import {IApiHTTPResponse} from 'src/app/leave-management-system/models/api.response.model'
import {map} from 'rxjs/operators'
import {environment} from 'src/environments/environment'

import {
  IHoliday,
  ILeaveType,
} from 'src/app/leave-management-system/models/leavetype.model'
import {IDepartment} from 'src/app/leave-management-system/models/department.model'
import {IEmployee, Image} from '../../employees/models/employeeModel'
// import { ILeaveDays } from 'src/app/leave-management-system/models/leaveDays.model';

@Injectable({
  providedIn: 'root',
})
export class LeavesService {
  leaveDays = leaveDays
  leave: ILeaves

  constructor(private http: HttpClient) {}

  // getRemainingDays(): Observable<any>{
  //   return of(leaveDays)
  // }

  approveLeaveRequest(leaveId: any): Observable<IApiHTTPResponse<ILeaves>> {
    return this.http.post<IApiHTTPResponse<ILeaves>>(
      `${environment.server_Url}supervisor/approveleave/${leaveId}`,
      leaveId
    )
  }
  declineLeaveRequest(leaveId: any): Observable<IApiHTTPResponse<ILeaves>> {
    return this.http.post<IApiHTTPResponse<ILeaves>>(
      `${environment.server_Url}supervisor/CANCELLEAVE/${leaveId}`,
      leaveId
    )
  }

  getRemainingDays(): Observable<IApiHTTPResponse<any>> {
    return this.http.get<IApiHTTPResponse<any>>(
      `${environment.server_Url}leave/leavetypes`
    )
  }
  getLeaveRequestsByUser(): Observable<IApiHTTPResponse<ILeaves[]>> {
    return this.http
      .get<IApiHTTPResponse<ILeaves[]>>(`${environment.server_Url}leave`)
      .pipe<IApiHTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }
  getleaveRequests(
    employeeId: string
  ): Observable<IApiHTTPResponse<ILeaves[]>> {
    return this.http.get<IApiHTTPResponse<ILeaves[]>>(
      `${environment.server_Url}supervisor/${employeeId}`
    )
  }

  EndingLeaveRequest(): Observable<IApiHTTPResponse<ILeaves[]>> {
    return this.http
      .get<IApiHTTPResponse<ILeaves[]>>(
        `${environment.server_Url}supervisor/leaves/ending`
      )
      .pipe<IApiHTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }

  MandatoryLeaveRequest(): Observable<IApiHTTPResponse<ILeaves[]>> {
    return this.http
      .get<IApiHTTPResponse<ILeaves[]>>(
        `${environment.server_Url}leave/mandatory`
      )
      .pipe<IApiHTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }

  getLeaveRequestDetail(leaveId: any): Observable<IApiHTTPResponse<ILeaves>> {
    return this.http
      .get<IApiHTTPResponse<ILeaves>>(
        `${environment.server_Url}leave/${leaveId}`
      )
      .pipe<IApiHTTPResponse<ILeaves>>(
        map((res) => {
          return res
        })
      )
  }

  AdminApprovedLeaveRequest(): Observable<IApiHTTPResponse<ILeaves[]>> {
    return this.http
      .get<IApiHTTPResponse<ILeaves[]>>(
        `${environment.server_Url}supervisor/leaves/upcoming`
      )
      .pipe<IApiHTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }
  EmployeeApprovedLeaveRequest(): Observable<IApiHTTPResponse<ILeaves[]>> {
    return this.http.get<IApiHTTPResponse<ILeaves[]>>(
      `${environment.server_Url}leave/upcoming`
    )
  }

  getUpcomingLeaveRequestById(
    id: string
  ): Observable<IApiHTTPResponse<ILeaves>> {
    return this.http.get<IApiHTTPResponse<ILeaves>>(
      `${environment.server_Url}leave/${id}`
    )
  }
  pendingLeaveRequests(): Observable<IApiHTTPResponse<ILeaves[]>> {
    return this.http
      .get<IApiHTTPResponse<ILeaves[]>>(
        `${environment.server_Url}leave/pending`
      )
      .pipe<IApiHTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }

  deleteLeaveRequest(id: string): Observable<IApiHTTPResponse<ILeaves>> {
    return this.http.delete<IApiHTTPResponse<ILeaves>>(
      `${environment.server_Url}leave/${id}`
    )
  }

 
getAllNewLeaveRequest(): Observable<IApiHTTPResponse<ILeaves[]>> {
    return this.http
      .get<IApiHTTPResponse<ILeaves[]>>(`${environment.server_Url}supervisor/alldepartments`)
      .pipe<IApiHTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }
  getDepartmentLeaveRequests(): Observable<IApiHTTPResponse<ILeaves[]>> {
    return this.http
      .get<IApiHTTPResponse<ILeaves[]>>(`${environment.server_Url}supervisor`)
      .pipe<IApiHTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }
  getDepartmentLeaveHistroy(): Observable<IApiHTTPResponse<ILeaves[]>> {
    return this.http
      .get<IApiHTTPResponse<ILeaves[]>>(`${environment.server_Url}supervisor/leaves/department`)
      .pipe<IApiHTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }


  getAllLeaves(): Observable<IApiHTTPResponse<ILeaves[]>> {
    return this.http
      .get<IApiHTTPResponse<ILeaves[]>>(
        `${environment.server_Url}supervisor/allleaves`
      )
      .pipe<IApiHTTPResponse<ILeaves[]>>(
        map((res) => {
          return res
        })
      )
  }
  createLeaveRequest(leave: any): Observable<IApiHTTPResponse<any>> {
    return this.http.post<IApiHTTPResponse<any>>(
      `${environment.server_Url}leave`,
      leave
    )
  }
  updateLeaveRequest(
    leaveId: any,
    ileavetype: ILeaveType
  ): Observable<IApiHTTPResponse<any>> {
    return this.http.post<IApiHTTPResponse<any>>(
      `${environment.server_Url}leave/${leaveId}`,
      ileavetype
    )
  }
  addNote(leaveId: string, note: INote): Observable<IApiHTTPResponse<INote>> {
    return this.http.post<IApiHTTPResponse<INote>>(
      `${environment.server_Url}note/${leaveId}`,
      note
    )
  }
  getNote(leaveId: string): Observable<IApiHTTPResponse<INote[]>> {
    return this.http.get<IApiHTTPResponse<INote[]>>(
      `${environment.server_Url}note/${leaveId}`
    )
  }
  MakeRole(departmentId: string, head:any): Observable<IApiHTTPResponse<[]>> {
    return this.http.patch<IApiHTTPResponse<[]>>(
      `${environment.server_Url}department/${departmentId}`,
 head
    )
  }

  //Leave types
  createLeavetype(
    ileavetype: ILeaveType
  ): Observable<IApiHTTPResponse<ILeaveType>> {
    return this.http.post<IApiHTTPResponse<any>>(
      `${environment.server_Url}leavetype`,
      ileavetype
    )
  }
  getLeaveType(): Observable<IApiHTTPResponse<ILeaveType>> {
    return this.http.get<IApiHTTPResponse<any>>(
      `${environment.server_Url}leavetype`
    )
  }
  getLeaveTypes(): Observable<ILeaveType[]> {
    return this.http
      .get<IApiHTTPResponse<any>>(`${environment.server_Url}leavetype`)
      .pipe(
        map((res) => {
          return res.result
        })
      )
  }

  getAllLeaveTypes(): Observable<IApiHTTPResponse<ILeaveType[]>> {
    return this.http.get<IApiHTTPResponse<ILeaveType[]>>(
      `${environment.server_Url}leavetype`
    )
  }

  getLeavetypeByID(id: string) {
    return this.http.get<IApiHTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype/${id}`
    )
  }
  deleteLeavetype(id: string): Observable<IApiHTTPResponse<ILeaveType>> {
    return this.http.delete<IApiHTTPResponse<ILeaveType>>(
      `${environment.server_Url}leavetype/${id}`
    )
  }
  updateLeavetype(
    id: string,
    ileavetype: ILeaveType
  ): Observable<IApiHTTPResponse<ILeaveType>> {
    return this.http.post<IApiHTTPResponse<ILeaveType>>(
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
  getAnnualLeaveDays() {
    return leaveDays
  }

  getAllDepartments(): Observable<IDepartment[]> {
    return this.http
      .get<IApiHTTPResponse<IDepartment[]>>(
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
  ): Observable<IApiHTTPResponse<IDepartment>> {
    return this.http.post<IApiHTTPResponse<IDepartment>>(
      `${environment.server_Url}department`,
      departments
    )
  }
  updateDepartment(departmentId:string,department:IDepartment){
    return this.http.patch<IApiHTTPResponse<IDepartment>>(
      `${environment.server_Url}department/${departmentId}`,
      department
    )
  }
  deleteDepartment(
    departmentId: any
  ): Observable<IApiHTTPResponse<IDepartment>> {
    return this.http.delete<IApiHTTPResponse<IDepartment>>(
      `${environment.server_Url}department/${departmentId}`
    )
  }

 
  getHolidays(): Observable<IApiHTTPResponse<IHoliday[]>> {
    return this.http.get<IApiHTTPResponse<IHoliday[]>>(
      `${environment.server_Url}holiday`
    )
  }

  createHolidays(holidays: any): Observable<IApiHTTPResponse<any>> {
    return this.http.post<IApiHTTPResponse<any>>(
      `${environment.server_Url}holiday`,
      holidays
    )
  }

  getLeaveSummary(): Observable<IApiHTTPResponse<ILeaves>> {
    return this.http.get<IApiHTTPResponse<ILeaves>>(
      `${environment.server_Url}leave/summary`
    )
  }
  employeeleavesummary(
    employeeId: string
  ): Observable<IApiHTTPResponse<ILeavesummary>> {
    return this.http.get<IApiHTTPResponse<ILeavesummary>>(
      `${environment.server_Url}supervisor/usersummary/${employeeId}`
    )
  }
  deleteHoliday(holidayId: string): Observable<IApiHTTPResponse<IHoliday>> {
    return this.http.delete<IApiHTTPResponse<IDepartment>>(
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
  getDepartmentById(departmentId: string): Observable<IApiHTTPResponse<{
      department: IDepartment
      users: any 
    head:any}>> {
    return this.http.get<
      IApiHTTPResponse<{
        department: IDepartment
        users: any
        head:any
      }>>(`${environment.server_Url}department/${departmentId}`)
  }


  getHolidayById(holidayId:string): Observable<IApiHTTPResponse<IHoliday>> {
    return this.http.get<IApiHTTPResponse<IHoliday>>(
      `${environment.server_Url}holiday/${holidayId}`
    )
  }

  updateHoliday(holidayId:string, holiday:IHoliday): Observable<IApiHTTPResponse<IHoliday>> {
    return this.http.post<IApiHTTPResponse<IHoliday>>(
      `${environment.server_Url}holiday/${holidayId}`,
      holiday
    )
  }

}



