import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, State} from '../reducer/employeeReducer'
import { RouterStateUrl } from '../router/custom-serializer'
import { getCurrentRoute } from '../router/router.selector'
const getEmployeeFeatureState =createFeatureSelector<State>('employee');

 const { selectEntities, selectAll } = adapter.getSelectors();
 
 export const getEmployeeEntities = createSelector(
    getEmployeeFeatureState,
    selectEntities
  );
   
  export const getEmployees = createSelector(getEmployeeFeatureState,selectAll);

 

  export const getEmployeeById = createSelector(
    getEmployeeEntities,
    getCurrentRoute, (employees, route: RouterStateUrl) => {
      return employees ? [route.params['id']] : null;
    }
  );
  