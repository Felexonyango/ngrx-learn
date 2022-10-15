import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthActionTypes } from './actions/actionTypes';
import { LogIn, LogInFailure, LogInSuccess } from './actions/auth.action';
import { AppState } from './state/appState';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store$: Store<AppState>
  ) {}
  

  login$ = createEffect(() =>this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action:LogIn) => action.payload),
      switchMap((payload: any) => {
        return this.authService.login(payload.email, payload.password).pipe(
          map((user: any) => {
            return new LogInSuccess({ token: user.token, email: user.email })
           
          }),
          catchError((error: any) => {
            return of(new LogInFailure({ error: error }));
          })
        );
      })
    )
  );

  loginsucess$ = createEffect(() =>this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user:any) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/dashboard');
    })
  )
);



  
}
