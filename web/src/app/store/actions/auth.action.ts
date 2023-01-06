import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/auth";

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{user:User}>()
)

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: unknown }>()
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success',
  props<{ user:User}>()
);

export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{error:unknown}>()
);

export const AuthTypes = {
loginFailure,
loginSuccess,
logoutFailure,
logoutSuccess
  
};

export const dummyAction = createAction('[dummy action]');

  