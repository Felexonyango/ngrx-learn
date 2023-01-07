import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) {}

  canActivate(  
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isLoggedIn = this.authService.isLoggedIn();

      if (isLoggedIn) {
        const redirectUrl = (state?.url && !state?.url?.includes('auth')) ? state?.url : '/dashboard';
        this.authService.navigateByUrl(redirectUrl);
        return false;
      }

      return true;

  }

}
