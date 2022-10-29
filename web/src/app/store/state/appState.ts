import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterState, RouterStateSerializer } from '@ngrx/router-store';
import { employeeReducer, State } from '../reducer/employeeReducer';
import { authreducer, AuthState } from '../reducer/authReducer';
import { ROUTER_STATE_NAME } from '../router/router.selector';


export interface AppState {
  [ROUTER_STATE_NAME ]: RouterStateSerializer
  employee: State,
  authState: AuthState,
  
}

export const reducers: ActionReducerMap<AppState> = {
  [ROUTER_STATE_NAME ] : routerReducer,
  employee:employeeReducer,
  authState:authreducer
};


