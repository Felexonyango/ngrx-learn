import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { ILeaveType } from '../../../model/leave';
import { LeaveTypes } from '../../actions/leave/leavetype.actions';

export interface LeaveTypeState extends EntityState<ILeaveType> {
  loaded: boolean;
}

export function selectleaveTypeId(leaveType: ILeaveType): string {
  return leaveType._id;
}

export const adapter = createEntityAdapter<ILeaveType>({
  selectId: selectleaveTypeId,
});

export const initialState = adapter.getInitialState({
  loaded: false,
});

export const leaveTypeReducer = createReducer(
  initialState,
  on(LeaveTypes.LoadleaveTypes, (state) => ({ ...state, loaded: true })),

  on(LeaveTypes.loadLeaveTypesSuccess, (state, { leaveType }) => {
    return adapter.setAll(leaveType, state);
  }),

  on(LeaveTypes.createLeaveTypeSuccess, (state, { leaveType }) => {
    return adapter.addOne(leaveType, state);
  }),

  on(LeaveTypes.deleteLeaveTypeSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),

  on(LeaveTypes.updateLeaveType, (state) => ({ ...state, loaded: true })),
  
  on(LeaveTypes.updateLeaveTypeSuccess, (state, { leaveType }) => {
    return adapter.updateOne(leaveType, state);
  }),

  on(LeaveTypes.updateLeaveTypeFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    error,
  }))
);
