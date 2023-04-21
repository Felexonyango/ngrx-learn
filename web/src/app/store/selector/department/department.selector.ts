import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter,  departmentReducer, DepartmentState} from '../../reducer/department/departmentReducer'
import { RouterStateUrl } from '../../router/custom-serializer'
import { getCurrentRoute } from '../../router/router.selector'
import { IDepartment } from 'src/app/model/department';

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
      (entities, route) => {
        const id = route?.params['id'];
        console.log(id)
        return id ? entities[id] : null;
      }
    );
    
    export const selectDepartmentById = (id: string) => createSelector(
      
      getdepartmentById,
      (department) => department ? department[id] : null
      
    );
    
    

    
   
  
    

    
    
 
  