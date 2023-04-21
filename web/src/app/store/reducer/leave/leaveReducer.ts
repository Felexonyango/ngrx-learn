import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { ILeaves } from '../../../model/leave';
import { leaveActionType } from '../../actions/leave/leave.action';

export interface LeaveState extends EntityState<ILeaves> {
  loaded: boolean;
}

export function selectleaveId(leave: ILeaves): string {
  return leave?._id;
}

export const adapter = createEntityAdapter<ILeaves>({
  selectId: selectleaveId,
});

export const initialState = adapter.getInitialState({
  loaded: false,
});

export const leaveReducer = createReducer(
  initialState,
  on(leaveActionType.Loadleaves, (state) => ({ ...state, loaded: true })),

  on(leaveActionType.loadleavesSuccess, (state, { leaves }) => {
    return adapter.setAll(leaves, state);
  }),
  on(leaveActionType.loadleavesByuserSuccess, (state, { leaves }) => {
    return adapter.setAll(leaves, state);
  }),

  on(leaveActionType.createleaveSuccess, (state, { leaves }) => {
    return adapter.addOne(leaves, state);
  }),
  on(leaveActionType.ApproveLeaveSuccess, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(leaveActionType.loadapprovedleavesByUserSuccess, (state, { leaves }) => {
    return adapter.setAll(leaves, state);
  }),

  on(leaveActionType.loadadminleavehistorySucces, (state, { leaves }) => {
    return adapter.setAll(leaves, state);
  }),
  on(leaveActionType.loadpendingleavesSuccess, (state, { leaves }) => {
    return adapter.setAll(leaves, state);
  }),
  on(leaveActionType.loadapprovedleavesSucces, (state, { leaves }) => {
    return adapter.setAll(leaves, state);
  }),
  on(leaveActionType.loadEndingleavesSuccess, (state, { leaves })=>{
 return adapter.setAll(leaves,state)
  }),
 
  on(leaveActionType.deleteleaveSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),

  on(leaveActionType.updateleaveSuccess, (state) => ({
    ...state,
    loaded: true,
  })),

  on(leaveActionType.updateleaveSuccess, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),

  on(leaveActionType.updateleaveFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    error,
  }))
);
