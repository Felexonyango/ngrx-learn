import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
   private router:Router
  ) {}

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!!localStorage.getItem('accessToken')) {
      return true;
    }

    this.router.navigateByUrl('/auth/login').then();
    return false;
  }

}
