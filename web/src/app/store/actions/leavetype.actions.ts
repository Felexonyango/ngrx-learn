
import { ILeaveType} from '../../model/leave';
import { Update } from '@ngrx/entity';

import { createAction, props } from '@ngrx/store';
export const LoadleaveTypes = createAction('[LeaveType] Load All leaveType');

export const loadLeaveTypesSuccess = createAction(
  '[LeaveType] Load All leaveType Success',
  props<{ leaveType:ILeaveType[]}>()
)

export const loadLeaveTypesFailure = createAction(
  '[LeaveType] Load  leaveType Failure',
  props<{ error: unknown }>()
);

export const createLeaveType = createAction(
  '[LeaveType] Create leaveType',
  props<{ leaveType: ILeaveType}>()
);

export const createLeaveTypeSuccess = createAction(
  '[LeaveType] Create  leaveType Success',
  props<{ leaveType: ILeaveType}>()
);

export const createLeaveTypeFailure = createAction(
  '[LeaveType] Create leaveType Failure',
  props<{ error: unknown }>()
);

export const updateLeaveType = createAction(
  '[LeaveType] Update leavetype',
  props<{ leaveType:ILeaveType}>());


export const updateLeaveTypeSuccess = createAction(
  '[LeaveType] Update  leaveType Success',
  props<{leaveType:Update<ILeaveType>}>());

  

export const updateLeaveTypeFailure = createAction(
  '[LeaveType] Update leaveType Failure',
  props<{ error: unknown }>()
);

export const deleteLeaveType= createAction(
  '[LeaveType] Delete leaveType',
  props<{ id: string }>()
);
export const deleteLeaveTypeSuccess = createAction(
  '[LeaveType] Delete leaveType Success',
  props<{ id: string }>()
);

export const deleLeaveTypeFailure = createAction(
  '[LeaveType] Delete leaveType Failure',
  props<{error:unknown}>()
)

export const LeaveTypes = {
LoadleaveTypes,
loadLeaveTypesSuccess,
loadLeaveTypesFailure,
createLeaveType,
createLeaveTypeSuccess,
createLeaveTypeFailure,
updateLeaveType,
updateLeaveTypeSuccess,
updateLeaveTypeFailure,
deleteLeaveTypeSuccess,
deleteLeaveType,
deleLeaveTypeFailure

  
};
export const dummyAction = createAction('[dummy action]');
