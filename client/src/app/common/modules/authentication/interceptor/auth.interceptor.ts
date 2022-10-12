import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private TOKEN_KEY = 'access_token';

  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      req.url.toLowerCase().search('login') > -1 ||
      req.url.toLowerCase().search('signup') > -1 ||
      req.url.toLowerCase().search('register') > -1
    ) {
    } else {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const Authorization = `Bearer ${token}`;
      req = req.clone({
        headers: req.headers.set(
          'Authorization',
          Authorization ? Authorization : ''
        ),
      });
    }
    return next.handle(req).pipe(
      tap(
        (event) => {},
        (err) => {}
      )
    );
  }
}
