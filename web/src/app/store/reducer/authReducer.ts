import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { User } from '../../model/auth';
import { AuthTypes } from '../actions/auth.action';

export interface AuthtState extends EntityState<User> {
  isAuthenticated: boolean;

}

export function selectuserId(user: User): string {
  return user._id;
}

export const adapter = createEntityAdapter<User>({
  selectId: selectuserId,
});

export const initialState = adapter.getInitialState({
  isAuthenticated: false,
  
});

export const authReducer = createReducer(
  initialState,
  on(AuthTypes.loginSuccess, (state) => ({ ...state, isAuthenticated: true })),

  on(AuthTypes.loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    error,
  })),
  on(AuthTypes.logoutSuccess, (state) => ({
    ...state,
    isAuthenticated: false,
  })),
  on(AuthTypes.logoutFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);


