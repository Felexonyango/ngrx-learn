import { Action } from "@ngrx/store";
import { AuthActionTypes } from "./actionTypes";

export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) {}
  }
  export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) {}
  }
  export class LogInFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) {}
  }
  
  export type All = | LogIn |LogInSuccess | LogInFailure;
  