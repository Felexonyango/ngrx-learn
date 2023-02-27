import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, State} from '../../reducer/employee/employeeReducer'
import { RouterStateUrl } from '../../router/custom-serializer'
import { getCurrentRoute } from '../../router/router.selector'

const getEmployeeFeatureState =createFeatureSelector<State>('employee');

export const EmployeeSelectors = adapter.getSelectors();


 export const getEmployeeEntities = createSelector(
    getEmployeeFeatureState,
    EmployeeSelectors.selectEntities
  );
   
  export const getEmployees = createSelector(
   getEmployeeFeatureState,
    EmployeeSelectors.selectAll
    );

    
    export const getEmployeeById = createSelector(
      getEmployeeEntities,
      getCurrentRoute,
      (employeeId, route: RouterStateUrl) => {
        return employeeId ? employeeId[route?.params['id']] : null;
      }
    );

    
   
  
    

    
    
 
  