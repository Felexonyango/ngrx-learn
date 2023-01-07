import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  TOKEN_KEY = 'jwtToken';
  redirectUrl: string;

  setAuthToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getAuthToken(): string {
    const token = localStorage.getItem(this.TOKEN_KEY);
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
  
  login(user: User): Observable<HTTPResponse<{ jwtToken: string }>> {
    return this.httpClient.post<HTTPResponse<{ jwtToken: string }>>(
      `${environment.server_Url}auth/login`,
      user
    );
 
  }

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  logout(): void {
    localStorage.clear();
    this.redirectUrl = '/';
    this.navigateByUrl('/auth/login');
  }
}
