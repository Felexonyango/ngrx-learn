import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import {User} from '../model/auth'

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
    return this.httpClient.post<User>(`${environment.server_Url}user/loginWithEmail`,{email,password})
      
      
  }
}