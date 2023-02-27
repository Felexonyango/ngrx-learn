import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, UrlSegment, CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate,CanLoad {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const isLoggedIn = this.auth.isLoggedIn();
  
    if (isLoggedIn) {
      this.auth.redirectUrl = state.url;
      return this.checkUserLogin(route, state);
    }
  
    // this.auth.logout();
    return of(false);
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): Observable<boolean | UrlTree> {
    if (this.auth.isLoggedIn()) {
      const userRole = this.auth.getRole();
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['/dashboard']);
        return of(false);
      }
      return of(true);
    }
  
    this.router.navigate(['/dashboard']);
    return of(false);
  }
  
  logout(){
    
  }

}