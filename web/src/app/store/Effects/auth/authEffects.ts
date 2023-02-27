import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess, LogOut } from '../../actions/auth/auth.action';
import { User } from '../../../model/auth';
import { Observable, of } from 'rxjs';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  
  ) {}

  redirectUrl:string

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action:LogIn)=>action.payload),
        switchMap((user:User)=>{
        return this.authService.login(user)
        .pipe(map((res)=>(new LogInSuccess(res))),
        tap((res) =>{
          const token = res.payload.data.token
         const redirectUrl = this.redirectUrl || '/'
          this.authService.navigateByUrl(redirectUrl);
          this.authService.setAuthToken(token)}))
        }),
      catchError((error) => of(new LogInFailure({ error })))
      
        
    )
  );







 
}
