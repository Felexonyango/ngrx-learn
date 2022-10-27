import { createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import {EmployeeActionTypes } from '../actions/employee.action';

import { IEmployee } from 'src/app/model/employees';
 
export interface State extends EntityState<IEmployee>{}


export const adapter = createEntityAdapter<IEmployee>({
    selectId:employee=>employee._id
});
  
export const intialState:State=adapter.getInitialState()

 export const employeeReducer =createReducer(
  intialState,
      on(EmployeeActionTypes.LoadEmployees, (state) => ({ ...state, loading: true })),

       on(EmployeeActionTypes.loadEmployeesSuccess,(state,{employees})=>{
        return adapter.setAll(employees, state)
       }),
       on(EmployeeActionTypes.createEmployee,(state,{employee})=>{
        return adapter.addOne(employee,state)
       })


 
    )

 