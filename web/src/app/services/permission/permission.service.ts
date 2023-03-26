import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTPResponse } from 'src/app/model/HTTPResponse'
import { IAllowedPermissions, IPermission } from 'src/app/model/permission.model'

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllPermissions(): Observable<HTTPResponse<IPermission[]>> {
        return this.httpClient.get<HTTPResponse<IPermission[]>>(`${environment.server_Url}organization/member/roles/all`);
    }

    getPermissionById(permissionId: string): Observable<HTTPResponse<IPermission>> {
        return this.httpClient.get<HTTPResponse<IPermission>>(`${environment.server_Url}organization/member/roles/one/${permissionId}`);
    }

    createPermission(permission: IPermission): Observable<HTTPResponse<IPermission>> {
        return this.httpClient.post<HTTPResponse<IPermission>>(`${environment.server_Url}organization/member/roles`, permission);
    }

    updatePermission(permissionId: string, permission: IPermission): Observable<HTTPResponse<IPermission>> {
        return this.httpClient.post<HTTPResponse<IPermission>>(`${environment.server_Url}organization/member/roles/${permissionId}`, permission);
    }

    deletePermission(permissionId: string): Observable<HTTPResponse<IPermission>> {
        return this.httpClient.delete<HTTPResponse<IPermission>>(`${environment.server_Url}organization/member/roles/${permissionId}`);
    }

    getAllowedPermissions(): Observable<HTTPResponse<IAllowedPermissions[]>> {
        return this.httpClient.get<HTTPResponse<IAllowedPermissions[]>>(`${environment.server_Url}organization/member/roles/permissions/static`);
    }

}
