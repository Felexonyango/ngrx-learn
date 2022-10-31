import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, leaveTypeReducer, LeaveTypeState} from '../reducer/leavetype.reducer'
import { RouterStateUrl } from '../router/custom-serializer'
import { getCurrentRoute } from '../router/router.selector'

const getLeaveTypeFeatureState =createFeatureSelector<LeaveTypeState>('leaveType');

export const LeaveTypeSelectors = adapter.getSelectors();


 export const getLeaveTypeEntities = createSelector(
    getLeaveTypeFeatureState,
    LeaveTypeSelectors.selectEntities
  );
   
  export const getleaveTypes = createSelector(
   getLeaveTypeFeatureState,
    LeaveTypeSelectors  .selectAll
    );

    
    export const getleaveTypeById = createSelector(
      getLeaveTypeEntities,
      getCurrentRoute,
      (leavetypeId, route: RouterStateUrl) => {
        return leavetypeId ? leavetypeId[route?.params['id']] : null;
      }
    );

    
   
  
    

    
    
 
  