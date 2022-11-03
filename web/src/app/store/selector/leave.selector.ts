import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter,  LeaveState} from '../reducer/leaveReducer'
import { RouterStateUrl } from '../router/custom-serializer'
import { getCurrentRoute } from '../router/router.selector'

const getLeaveFeatureState =createFeatureSelector<LeaveState>('leave');

export const LeaveSelectors = adapter.getSelectors();

 export const getLeaveEntities = createSelector(
    getLeaveFeatureState,
    LeaveSelectors.selectEntities
  );
   
  export const getleaveTypes = createSelector(
   getLeaveFeatureState,
    LeaveSelectors.selectAll
    );

    
    export const getleaveTypeById = createSelector(
      getLeaveEntities,
      getCurrentRoute,
      (leaveId, route: RouterStateUrl) => {
        return leaveId ? leaveId[route?.params['id']] : null;
      }
    );

    
   
  
    

    
    
 
  