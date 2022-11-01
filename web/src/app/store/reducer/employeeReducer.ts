import {  createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {EmployeeActionTypes } from '../actions/employee.action';

import { IEmployee } from 'src/app/model/employees';
 
export interface State extends EntityState<IEmployee>{
  loaded: boolean;
}


export function selectUserId(employee: IEmployee): string {
  return employee?._id
}

export const adapter= createEntityAdapter<IEmployee>({
  selectId: selectUserId,
  
});

export const initialState= adapter.getInitialState({
  loaded: false
});

 export const employeeReducer =createReducer(
 initialState,
      on(EmployeeActionTypes.LoadEmployees, (state) => ({ ...state, loading: true })),

       on(EmployeeActionTypes.loadEmployeesSuccess,(state,{employees})=>{
        return adapter.setAll(employees, state)
       }),
       on(EmployeeActionTypes.createEmployee,(state,{employee})=>{
        return adapter.addOne(employee,state)
       }),

       on(EmployeeActionTypes.deleteEmployeeSuccess, (state, { id }) => {
        return adapter.removeOne(id, state);
      }),

       on(EmployeeActionTypes.updateEmployee, (state) => ({ ...state, loading: true })),

       on(EmployeeActionTypes.updateEmployeeSuccess, (state, {update}) =>{
        return adapter.updateOne(update, state);
            
       }
         
       ),
       on(EmployeeActionTypes.updateEmployeeFailure, (state, { error }) => ({
         ...state,
         loading: false,
         error,
       })),
    )

 