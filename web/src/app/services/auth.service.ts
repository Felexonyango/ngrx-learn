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
    private router: Router,
   
  ) {}

  TOKEN_KEY = 'access_token';
  redirectUrl: string;

  setAuthToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

    getToken(): string {
      return localStorage.getItem('token');
    }

  login(email:string,password:string): Observable<User> {
    return this.httpClient.post<User>(`${environment.server_Url}/user/loginWithEmail`,{email,password})

  }


  logout(): void {
    localStorage.clear();
    this.redirectUrl = '/';
    this.navigateByUrl('/auth/login');
  }


}