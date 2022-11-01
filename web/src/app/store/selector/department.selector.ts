import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter,  departmentReducer, DepartmentState} from '../reducer/departmentReducer'
import { RouterStateUrl } from '../router/custom-serializer'
import { getCurrentRoute } from '../router/router.selector'

const getdepartmentFeatureState =createFeatureSelector<DepartmentState>('department');

export const departmentSelectors = adapter.getSelectors();

 export const getdepartmentEntities = createSelector(
    getdepartmentFeatureState,
    departmentSelectors.selectEntities
  );
   
  export const getdepartments = createSelector(
   getdepartmentFeatureState,
    departmentSelectors.selectAll
    );

    
    export const getdepartmentById = createSelector(
    getdepartmentEntities,
      getCurrentRoute,
      (departmentId, route: RouterStateUrl) => {
        return departmentId ? departmentId[route?.params['id']] : null;
      }
    );

    
   
  
    

    
    
 
  