import * as EmployeeActions from '../actions/employee.action';
import { EmployeeActionTypes } from '../actions/actionTypes';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IEmployee } from '../../model/employees';

export interface EmployeeState extends EntityState<IEmployee> {
  selectedEmployeeId: string | null;
  loading: boolean;
  error: string;
}

export const employeeAdapter: EntityAdapter<IEmployee> =
  createEntityAdapter<IEmployee>();

export const defaultState: EmployeeState = {
  ids: [],
  entities: {},
  selectedEmployeeId: null,
  loading: false,
  error: '',
};

export const initialState = employeeAdapter.getInitialState(defaultState);

export function employeeReducer(
  state = initialState,
  action: EmployeeActions.Actions
): EmployeeState {
  switch (action.type) {
    case EmployeeActionTypes.LOAD_EMPLOYEES: {
      return {
        ...state,
        loading: true,
      };
    }
    case EmployeeActionTypes.LOAD_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        entities:{},
        loading:true

      }
    }
    case EmployeeActionTypes.LOAD_EMPLOYEES_FAIL: {
      return {
        ...state,
        entities: {},
        error: action.payload,
      };
    }

    case EmployeeActionTypes.LOAD_EMPLOYEES_SUCCESS: {
      return employeeAdapter.addMany(action.payload, {
        ...state,
        loading: true,
      });
    }
    case EmployeeActionTypes.LOAD_EMPLOYEES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,

        error: action.payload,
      };
    }

    case EmployeeActionTypes.CREATE_EMPLOYEE: {
      return employeeAdapter.addOne(action.payload, state);
    }
    case EmployeeActionTypes.CREATE_EMPLOYEE_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,

        error: action.payload,
      };
    }

    case EmployeeActionTypes.UPDATE_EMPLOYEE_SUCESS: {
      return employeeAdapter.updateOne(action.payload, state);
    }
    case EmployeeActionTypes.UPDATE_EMPLOYEE_FAIL: {
      return {
        ...state,
        entities: {},
        error: action.payload,
      };
    }

    case EmployeeActionTypes.DELETE_EMPLOYEE_SUCCESS: {
      return employeeAdapter.removeOne(action.payload, state);
    }
    case EmployeeActionTypes.DELETE_EMPLOYEE_FAIL: {
      return {
        ...state,
        entities: {},
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
const getEmployeeFeatureState =
  createFeatureSelector<EmployeeState>('employee');

export const getEmployees = createSelector(
  getEmployeeFeatureState,
  employeeAdapter.getSelectors().selectAll
);

export const getEmplyeesLoaded = createSelector(
  getEmployeeFeatureState,
  (state: EmployeeState) => state.loading
);

export const getError = createSelector(
  getEmployeeFeatureState,
  (state: EmployeeState) => state.error
);

export const getCurrentEmployeeId = createSelector(
  getEmployeeFeatureState,
  (state: EmployeeState) => state.selectedEmployeeId
);

//   export const getCurrentProposal = createSelector(
//     getEmployeeFeatureState,
//     getCurrentEmployeeId,
//     state => state.entities[state.selectedEmployeeId]
//   );
