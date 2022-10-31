import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterState, RouterStateSerializer } from '@ngrx/router-store';
import { employeeReducer, State } from '../reducer/employeeReducer';
import { authreducer, AuthState } from '../reducer/authReducer';
import { ROUTER_STATE_NAME } from '../router/router.selector';
import {leaveTypeReducer, LeaveTypeState} from 'src/app/store/reducer/leavetype.reducer'

export interface AppState {
  [ROUTER_STATE_NAME ]: RouterStateSerializer
  employee: State,
  authState: AuthState,
  LeaveTypeState:LeaveTypeState
  
}

export const reducers: ActionReducerMap<AppState> = {
  [ROUTER_STATE_NAME ] : routerReducer,
  employee:employeeReducer,
  authState:authreducer,
  LeaveTypeState:leaveTypeReducer

};


