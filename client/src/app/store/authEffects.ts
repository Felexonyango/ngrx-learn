import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthActionTypes } from './actions/actionTypes';
import { LogIn, LogInFailure, LogInSuccess } from './actions/auth.action';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap((payload: any) => {
        return this.authService.login(payload.email, payload.password).pipe(
          map((user: any) => {
            return new LogInSuccess({ token: user.token, email: user.email });
          }),
          catchError((error: any) => {
            return of(new LogInFailure({ error: error }));
          })
        );
      })
    )
  );
}
