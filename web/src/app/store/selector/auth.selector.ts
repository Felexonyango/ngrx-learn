import {  createFeatureSelector } from '@ngrx/store';

export interface AuthState {
    authState:AuthState;
  }
  
export const selectAuthState = createFeatureSelector<AuthState>('auth');
