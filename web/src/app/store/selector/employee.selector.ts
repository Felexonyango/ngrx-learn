import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, State} from '../reducer/employeeReducer'

export const postsSelectors = adapter.getSelectors();
const getEmployeeFeatureState =createFeatureSelector<State>('employee');
export const getEmployees = createSelector(getEmployeeFeatureState,adapter.getSelectors().selectAll);

