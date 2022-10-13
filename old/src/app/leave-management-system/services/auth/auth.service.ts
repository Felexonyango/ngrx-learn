import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {JwtHelperService} from '@auth0/angular-jwt'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {environment} from 'src/environments/environment'
import {IApiHTTPResponse} from '../../models/api.response.model'
import {HTTPResponseStatus, ILogin, IRegister} from '../../models/auth.model'
import {UtilService} from '../util/util.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  TOKEN_KEY = 'access_token'
  redirectUrl: string
  // userRoles = UserRoles;
  loginPageStatusMessage: {
    type: HTTPResponseStatus
    title: string
    message: string
  }

  user: any = {}
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private tokenDecoder: JwtHelperService,
    private utilService: UtilService
  ) {}

  setAuthToken(token: string): void {
    console.log(token)
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url)
  }

  handleLoginRedirect(): void {
    // if (this.redirectUrl?.includes("pending-invites")) {
    //     this.router.navigateByUrl(this.redirectUrl);
    // } else {
    //      const redirectUrl = (this.redirectUrl && (this.redirectUrl !== '/')) ? this.redirectUrl : '/app';
    //     const redirectUrl = "/app";
    //     this.navigateByUrl(redirectUrl);
    // }

    const redirectUrl = '/leave'
    this.navigateByUrl(redirectUrl)
  }

  login(userDetails: ILogin): Observable<IApiHTTPResponse<{jwtToken: string}>> {
    return this.httpClient
      .post<IApiHTTPResponse<{jwtToken: string}>>(
        `${environment.server_Url}auth/login`,
        userDetails
      )
      .pipe(
        map((res) => {
          console.log(res)
          const token = res.result.jwtToken
          this.setAuthToken(token)
          this.handleLoginRedirect()
          return res
        })
      )
  }

  register(userDetails: IRegister): Observable<IApiHTTPResponse<any>> {
    return this.httpClient
      .post<IApiHTTPResponse<any>>(
        `${environment.server_Url}user/signupWithEmail`,
        userDetails
      )
      .pipe(
        map((res) => {
          return res
        })
      )
  }

  forgotPassword(email: any): Observable<IApiHTTPResponse<any>> {
    return this.httpClient.post<IApiHTTPResponse<any>>(
      `${environment.server_Url}auth/forgotPassword`,
      email
    )
  }

  resetPassword(resetDetails: any): Observable<IApiHTTPResponse<any>> {
    return this.httpClient.post<IApiHTTPResponse<any>>(
      `${environment.server_Url}auth/changePassword`,
      resetDetails
    )
  }
  verifyAuthItem(
    verifyDetails
  ): Observable<IApiHTTPResponse<{access_token: string}>> {
    return this.httpClient
      .post<IApiHTTPResponse<{access_token: string}>>(
        `${environment.server_Url}user/verifyAuthItem`,
        verifyDetails
      )
      .pipe(
        map((res) => {
          //   const token = res.result.access_token;
          //   this.setAuthToken(token);

          return res
        })
      )
  }
  getAuthToken(): any {
    const token = localStorage.getItem(this.TOKEN_KEY)
    return token
  }

  isLoggedIn(): boolean {
    const token = this.getAuthToken()
    if (token) {
      const isTokenExpired = this.tokenDecoder.isTokenExpired(token)
      return isTokenExpired ? false : true
    }
    return false
  }

  logout(): void {
    // localStorage.clear();
    localStorage.removeItem(this.TOKEN_KEY)
    this.redirectUrl = '/auth/login'
    this.navigateByUrl(this.redirectUrl)
  }

  decodedToken(): any {
    const token = this.getAuthToken()
    return token ? this.tokenDecoder.decodeToken(token) : {}
  }
  getLoggedInUserId(): string {
    const decodedToken = this.decodedToken();
    const userId = decodedToken._id;

    return userId;
}
doesHaveRole(userRole: string[]) {
    const decodedToken = this.decodedToken();
    const userRoles = decodedToken.roles;
    if (userRoles?.some((r) => userRole.includes(r))) {
        return true;
    }
    return false;
}
}
