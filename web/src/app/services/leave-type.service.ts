import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
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
}
