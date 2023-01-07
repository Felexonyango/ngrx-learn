import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess, LogOut } from '../actions/auth.action';
import { User } from '../../model/auth';
import { Observable, of } from 'rxjs';
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
      map((action:LogIn)=>action.payload),
        switchMap(payload=>{
        return this.authService.login(payload.email,payload.password)
        .pipe(map((user)=>{
          return new LogInSuccess({token: user.token, email: payload.email});
        }))
        
      }),
      catchError((error) => of(new LogInFailure({ error })))
      
        
    )
  );




 
}
