import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, State} from '../reducer/employeeReducer'
import { RouterStateUrl } from '../router/custom-serializer'
import { getCurrentRoute } from '../router/router.selector'

const getEmployeeFeatureState =createFeatureSelector<State>('employee');

export const EmployeeSelectors = adapter.getSelectors();

 export const getEmployeeEntities = createSelector(
    getEmployeeFeatureState,
    EmployeeSelectors.selectEntities
  );
   
  export const getEmployees = createSelector(
    getEmployeeFeatureState,
    EmployeeSelectors.selectAll);

 
    //export const getSelectedEmployeeId = (state: State) =>state.
    
   
  
    const {selectEntities} = adapter.getSelectors();
     
     export const selectUserEntities = selectEntities;
    
    //export const getSelectedEmployeeId = (state: State) => state.selectedEmployeeId
  

    // export const selectCurrentEmployee = createSelector(
    //   getEmployeeEntities,
    //   getSelectedEmployeeId,
    //   (employeeEntities, employeeId) => employeeEntities[employeeId]
    // );
   export const getEmployeeById = createSelector(
    getEmployeeEntities,
    getCurrentRoute, (employee, route: RouterStateUrl) => {
      return employee ? route.params['id'] : null;
    }
  );

  