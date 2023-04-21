import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { IDepartment } from '../../../model/department';
import { DepartmentActionTypes } from '../../actions/department/department.actions';

export interface DepartmentState extends EntityState<IDepartment> {
  loaded: boolean;
}

export function selectdepartmentTypeId(department: IDepartment): string {
  return department._id;
}

export const adapter = createEntityAdapter<IDepartment>({
  selectId: selectdepartmentTypeId,
});

export const initialState = adapter.getInitialState({
  loaded: false,
});

export const departmentReducer = createReducer(
  initialState,
  on(DepartmentActionTypes.LoadDepartments, (state) => ({ ...state, loaded: true })),

  on(DepartmentActionTypes.loadDepartmentsSuccess, (state, { departments }) => {
    return adapter.setAll(departments, state);
  }),

  on(DepartmentActionTypes.createDepartment, (state, { department }) => {
    return adapter.addOne(department, state);
  }),

  on(DepartmentActionTypes.deleteDepartmentsuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),

  on(DepartmentActionTypes.updateDepartment, (state) => ({ ...state, loaded: true })),
  
  on(DepartmentActionTypes.updateDepartmentSuccess, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),

  on(DepartmentActionTypes.updateDepartmentFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    error,
  }))
);
