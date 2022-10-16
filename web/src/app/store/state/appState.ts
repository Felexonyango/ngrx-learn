import * as auth from '../reducer/authReducer';
import { createFeatureSelector } from '@ngrx/store';
export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
