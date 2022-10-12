import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IApiHTTPResponse } from '../../models/api.response.model';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  getAllUsers(): Observable<IApiHTTPResponse<IUser[]>> {
    return this.httpClient.get<IApiHTTPResponse<IUser[]>>(`${environment.server_Url}user/admin`);
  }

  createUser(user: IUser): Observable<IApiHTTPResponse<IUser>> {
    return this.httpClient.post<IApiHTTPResponse<IUser>>(`${environment.server_Url}user/admin`, user);
  }

  updateUser(user: IUser, userId: string): Observable<IApiHTTPResponse<IUser>> {
    return this.httpClient.post<IApiHTTPResponse<IUser>>(`${environment.server_Url}user/admin/updateUser/${userId}`, user);
  }

  // deleteUser(userId: string): Observable<IApiHTTPResponse<IUser>> {
  //   return this.httpClient.delete<IApiHTTPResponse<IUser>>(`${environment.server_Url}user/admin/${userId}deleteUser`);
  // }

  deleteUser(userId: string): Observable<IApiHTTPResponse<IUser>> {
    return this.httpClient.delete<IApiHTTPResponse<IUser>>(`${environment.server_Url}user/slateforDeletion/${userId}`);
  }

  restoreDeletedUser(userId: string): Observable<IApiHTTPResponse<IUser>> {
    return this.httpClient.delete<IApiHTTPResponse<IUser>>(`${environment.server_Url}user/unslateforDeletion/${userId}`);
  }

  getDeletedUsers(): Observable<IApiHTTPResponse<IUser[]>> {
    return this.httpClient.get<IApiHTTPResponse<IUser[]>>(`${environment.server_Url}user/admin/allDeleted`);
  }

  getUserById(userId: string): Observable<IApiHTTPResponse<IUser>> {
    return this.httpClient.get<IApiHTTPResponse<IUser>>(`${environment.server_Url}user/admin/getUser/${userId}`);
  }

  // assignUserRole(role: {role: UserRoles}, userId: string): Observable<IApiHTTPResponse<IUser>> {
  //   return this.httpClient.post<IApiHTTPResponse<IUser>>(`${environment.server_Url}user/admin/assignRole/${userId}`, role);
  // }

  // unAssignUserRole(role: {role: UserRoles}, userId: string): Observable<IApiHTTPResponse<IUser>> {
  //   return this.httpClient.post<IApiHTTPResponse<IUser>>(`${environment.server_Url}user/admin/removeRole/${userId}`, role);
  // }

  getAllUsersCount(): Observable<IApiHTTPResponse<number>> {
    return this.httpClient.get<IApiHTTPResponse<number>>(`${environment.server_Url}user/admin/all/count`);
  }
  getAllSearchedUsersCount(searchParam: string): Observable<IApiHTTPResponse<number>> {
    return this.httpClient.post<IApiHTTPResponse<number>>(`${environment.server_Url}user/admin/all/searched`, {searchParam});
  }
  getPaginatedUsers(pagination?: any): Observable<IApiHTTPResponse<IUser[]>> {
    return this.httpClient
    .post<IApiHTTPResponse<IUser[]>>(`${environment.server_Url}user/admin/all/paginated`, pagination ? pagination : {});
  }
  getUnApprovedUsers(pagination?: any): Observable<IApiHTTPResponse<IUser[]>> {
    return this.httpClient
    .post<IApiHTTPResponse<IUser[]>>(`${environment.server_Url}user/unApprovedUsers`, pagination ? pagination : {});
  }
  unApprovedUserCount(): Observable<IApiHTTPResponse<number>> {
    return this.httpClient.get<IApiHTTPResponse<number>>(`${environment.server_Url}user/unApprovedUserCount`);
  }
  unApprovedSearchedUserCount(searchParam: string): Observable<IApiHTTPResponse<number>> {
    return this.httpClient.post<IApiHTTPResponse<number>>(`${environment.server_Url}user/unApprovedSearchedUserCount`, {searchParam});
  }
  getApprovedUsers(pagination?: any): Observable<IApiHTTPResponse<IUser[]>> {
    return this.httpClient
    .post<IApiHTTPResponse<IUser[]>>(`${environment.server_Url}user/approvedUsers`, pagination ? pagination : {});
  }
  approvedUserCount(): Observable<IApiHTTPResponse<number>> {
    return this.httpClient.get<IApiHTTPResponse<number>>(`${environment.server_Url}user/approvedUserCount`);
  }
  sendVerificationEmail(userId: string, authItemValue: string): Observable<IApiHTTPResponse<number>> {
    return this.httpClient
    .post<IApiHTTPResponse<number>>(`${environment.server_Url}user/admin/sendVerificationEmail/${userId}`, {email: authItemValue});
  }
  approvedSearchedUserCount(searchParam: string): Observable<IApiHTTPResponse<number>> {
    return this.httpClient.post<IApiHTTPResponse<number>>(`${environment.server_Url}user/approvedSearchedUserCount`, {searchParam});
  }

  // getAllUserRoles(): Observable<IApiHTTPResponse<IUserRole[]>> {
  //   return this.httpClient.get<IApiHTTPResponse<IUserRole[]>>(`${environment.server_Url}userRole/all`);
  // }

  getAllHardCodedUserRoles(): Observable<IApiHTTPResponse<string[]>> {
    return this.httpClient.get<IApiHTTPResponse<string[]>>(`${environment.server_Url}user/getAvailableSystemRoles`);
  }

  // createUserRole(userRole: IUserRole): Observable<IApiHTTPResponse<IUserRole>> {
  //   return this.httpClient.post<IApiHTTPResponse<IUserRole>>(`${environment.server_Url}userRole`, userRole);
  // }

  // updateUserRole(userRole: IUserRole, userRoleId: string): Observable<IApiHTTPResponse<IUserRole>> {
  //   return this.httpClient.post<IApiHTTPResponse<IUserRole>>(`${environment.server_Url}userRole/update/${userRoleId}`, userRole);
  // }

  // deleteUserRole(userRoleId: string): Observable<IApiHTTPResponse<IUserRole>> {
  //   return this.httpClient.delete<IApiHTTPResponse<IUserRole>>(`${environment.server_Url}userRole/delete/${userRoleId}`);
  // }

  // getUserRoleById(userRoleId: string): Observable<IApiHTTPResponse<IUserRole>> {
  //   return this.httpClient.get<IApiHTTPResponse<IUserRole>>(`${environment.server_Url}userRole/${userRoleId}`);
  // }

  getUserProfile(): Observable<IApiHTTPResponse<IUser>> {
    return this.httpClient.get<IApiHTTPResponse<IUser>>(`${environment.server_Url}user/profile`);
  }

  updateUserProfile(user: IUser): Observable<IApiHTTPResponse<IUser>> {
    return this.httpClient.post<IApiHTTPResponse<IUser>>(`${environment.server_Url}user/profile`, user);
  }

  // getProfilePictureMetaData(): Observable<IApiHTTPResponse<IFile>> {
  //   return this.httpClient.get<IApiHTTPResponse<IFile>>(`${environment.server_Url}user/profilePicture`);
  // }

  // addUserAuthItem(authItem: IAuthItem): Observable<IApiHTTPResponse<IAuthItem>> {
  //   return this.httpClient.post<IApiHTTPResponse<IAuthItem>>(`${environment.server_Url}user/addAuthItem`, authItem);
  // }

  // deleteUserAuthItem(authItem: IAuthItem): Observable<IApiHTTPResponse<IAuthItem>> {
  //   return this.httpClient.post<IApiHTTPResponse<IAuthItem>>(`${environment.server_Url}user/removeAuthItem`, authItem);
  // }
}
