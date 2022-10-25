import { createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import {EmployeeActionTypes } from '../actions/employee.action';

import { IEmployee } from 'src/app/model/employees';
 
export interface State extends EntityState<IEmployee>{}

export function selectEmployeeId(a: IEmployee): string {
    //In this case this would be optional since primary key is id
    return a._id;
}
 
export const adapter = createEntityAdapter<IEmployee>({
    selectId: selectEmployeeId
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

 