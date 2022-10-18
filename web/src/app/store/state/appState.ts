import * as auth from '../reducer/authReducer';
 import * as employee  from '../reducer/employeeReducer'
import { createFeatureSelector } from '@ngrx/store';
export interface AuthState {
  authState: auth.AuthState;
}



export const reducers = {
  auth: auth.authreducer,
  employee:employee.employeeReducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');
