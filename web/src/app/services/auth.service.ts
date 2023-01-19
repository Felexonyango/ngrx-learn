import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HTTPResponse } from '../model/HTTPResponse';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private tokenDecoder: JwtHelperService
  ) {}

  token_KEY = 'token';
  redirectUrl: string;
  roleAs:any
  setAuthToken(token: string): void {
    localStorage.setItem(this.token_KEY, token);
  }

  getAuthToken(): string {
    const token = localStorage.getItem(this.token_KEY);
    return token;
  }

  isLoggedIn(): boolean {
    const token = this.getAuthToken();
  
    if (token) {
      const isTokenExpired = this.tokenDecoder.isTokenExpired(token);
     
      return isTokenExpired ? false : true;
    }
    return false;
  }
  getRole() {
    this.roleAs = localStorage.getItem('role');
    return this.roleAs;
  }


  login(user:User): Observable<HTTPResponse<{token:string}>> {
    return this.httpClient.post<HTTPResponse<{token:string}>>(
      `${environment.server_Url}auth/login`,user)
      
  }
 
  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  logout(): void {
    localStorage.clear();
    this.redirectUrl = '/';
    this.navigateByUrl('/auth/login');
  }
  decodedToken(): any {
    const token = this.getAuthToken();
    return token ? this.tokenDecoder.decodeToken(token) : {};
  }
}
