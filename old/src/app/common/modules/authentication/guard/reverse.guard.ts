import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/leave-management-system/services/auth/auth.service';
import { UtilService } from 'src/app/leave-management-system/services/util/util.service';
@Injectable({
  providedIn: 'root',
})
export class ReverseGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private utilService: UtilService
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {
      const redirectUrl = (state.url && !state.url.includes('auth')) ?
        state.url : '/leave';
      this.router.navigateByUrl(redirectUrl);
      return false;
    }
    return true;
  }

}
