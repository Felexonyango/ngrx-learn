import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes } from '../actions/actionTypes';
import { LogIn, LogInFailure, LogInSuccess } from '../actions/auth.action';
import { User } from '../../model/auth';
import { of } from 'rxjs';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      mergeMap((user:User) => {
        return this.authService.login(user).pipe(
          map((res: any) => {
            const token = res.result.jwtToken;
            this.authService.setAuthToken(token);
            const redirectUrl = this. authService.redirectUrl || '/'
            this.authService.navigateByUrl(redirectUrl);
            return res;
          }),
          catchError((error: any) => {
            return of(new LogInFailure({ error: error }));
          })
        );
      })
    )
  );

 

  loginsucess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
      tap((user: any) => {
        localStorage.setItem('jwtToken', user.payload.token);
        this.router.navigateByUrl('/dashboard');
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGOUT),
      tap((user: any) => {
        localStorage.removeItem('jwtToken');
      })
    )
  );
}