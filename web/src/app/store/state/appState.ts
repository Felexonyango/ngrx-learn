import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterState, RouterStateSerializer } from '@ngrx/router-store';
import { employeeReducer, State } from '../reducer/employeeReducer';
import { authReducer, AuthtState } from '../reducer/authReducer';
import { ROUTER_STATE_NAME } from '../router/router.selector';
import {leaveTypeReducer, LeaveTypeState} from 'src/app/store/reducer/leavetype.reducer'
import {departmentReducer,DepartmentState} from 'src/app/store/reducer/departmentReducer'
import {leaveReducer,LeaveState} from 'src/app/store/reducer/leaveReducer'
export interface AppState {
  [ROUTER_STATE_NAME ]: RouterStateSerializer
  employee: State,
  authState: AuthtState
  leaveType:LeaveTypeState
  department: DepartmentState,
  leave:LeaveState
  
}

export const reducers: ActionReducerMap<AppState> = {
  [ROUTER_STATE_NAME ] : routerReducer,
  employee:employeeReducer,
  authState:authReducer,
  leaveType:leaveTypeReducer,
  department:departmentReducer,
  leave:leaveReducer

};


