import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  login(email:string,password:string): Observable<User> {
    return this.httpClient.post<User>(`${environment.server_Url}auth/login`,{email,password})
      
      
  }


  public signOut(): void {
    localStorage.removeItem('token');
  }


}
