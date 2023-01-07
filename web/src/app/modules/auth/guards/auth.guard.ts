import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}
  canActivate(): boolean {
    if (!this.auth.getAuthToken()) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }
}


