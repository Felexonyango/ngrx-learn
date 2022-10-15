import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const Authorization = 'Bearer ' + this.authService.getToken();
    request = request.clone({
      headers: request.headers
        .set('authorization', Authorization ? Authorization : '')
    });
    return next.handle(request).pipe(tap(
    event => {
    },
    err => {
      console.log(err);
    }
  ));

  }
}
