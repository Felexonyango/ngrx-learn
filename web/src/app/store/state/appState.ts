import { createFeatureSelector } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { employeeReducer } from '../reducer/employeeReducer';
import { authreducer } from '../reducer/authReducer';

export interface AuthState {
  authState:AuthState;
}

export const reducers = {
  auth:authreducer,
  employee:employeeReducer,
  router: routerReducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');
