import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { employeeReducer, State } from '../reducer/employeeReducer';
import { authreducer, AuthState } from '../reducer/authReducer';


export interface AppState {
  router: RouterState,
  employee: State,
  authState: AuthState,
  
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  employee:employeeReducer,
  authState:authreducer
};


