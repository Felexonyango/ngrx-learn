import { ILeaves } from '../../model/leave';
import { Update } from '@ngrx/entity';

import { createAction, props } from '@ngrx/store';

export const Loadleaves = createAction('[leaves] Load All leaves');
export const loadleavesSuccess = createAction(
  '[leave] Load All leaves Success',
  props<{ leaves: ILeaves[] }>()
)

export const loadleavessFailure = createAction(
  '[leave] Load  leaves Failure',
  props<{ error: unknown }>()
)

export const Loadleave = createAction('[leave] Load  leave');

export const loadleaveSuccess = createAction(
  '[leave] Load  leave Success',
  props<{ leave: ILeaves }>()
);

export const loadleaveFailure = createAction(
  '[leave] Load  leave Failure',
  props<{ error: unknown }>()
);

export const createleave = createAction(
  '[leave] Create leave',
  props<{ leaves: ILeaves }>()
);

export const createleaveSuccess = createAction(
  '[leave] Create  leave Success',
  props<{ leaves: ILeaves }>()
);

export const createleaveFailure = createAction(
  '[leave] Create leave Failure',
  props<{ error: unknown }>()
);

export const updateleave = createAction(
  '[leave] Update leave',
  props<{ leaves: ILeaves }>()
);

export const updateleaveSuccess = createAction(
  '[leave] Update  leave Success',
  props<{ leaves: Update<ILeaves> }>()
);

export const updateleaveFailure = createAction(
  '[leave] Update leave Failure',
  props<{ error: unknown }>()
);

export const deleteleave = createAction(
  '[leave] Delete leaves',
  props<{ id: string }>()
);
export const deleteleaveSuccess = createAction(
  '[leave] Delete leave Success',
  props<{ id: string }>()
);

export const deleleaveFailure = createAction(
  '[leave] Delete leave Failure',
  props<{ error: unknown }>()
);
export const loadleavesByuser = createAction(
  '[user leaves] get all leaves',
  
);

export const loadleavesByuserSuccess = createAction(
  '[user leaves] get all leaves success',
  props<{ leaves: ILeaves[] }>()
);

export const loadleavesByuserFailure = createAction(
  '[user leaves] get leaves failure',
  props<{ error: unknown }>()
);

export const loadapprovedleavesByUser = createAction(
  '[new leaves] get new leaves'
)
export const loadapprovedleavesByUserSuccess = createAction(
  '[new leaves] get new leaves success',
  props<{leaves: ILeaves[]}>()
);
export const loadapprovedleavesByUserFailure = createAction(
  '[new leaves] get new leaves failure',
  props<{error:unknown}>()
)
export const loadadminleavehistory = createAction(
  'admin leaves] get admin leave history'
)
export const loadadminleavehistorySucces = createAction(
  'admin leaves] get admin leave history succes',
  props<{leaves:ILeaves[]}>()
)
export const loadadminleavehistoryFailure = createAction(
  'admin leaves] get admin leave history failure',
  props<{error:unknown}>()
)

export const loadpendingleaves=createAction(
  '[pending leaves] get pending leaves'
)
export const loadpendingleavesSuccess = createAction(
  '[pending leaves] get pending leaves success',
  props<{leaves:ILeaves[]}>()
)
export const loadpendingleavesFailure = createAction(
  '[pending leaves] get pending leaves failure',
  props<{error:unknown}>()
)


export const ApproveLeave=createAction(
  '[approve leave] Approve leave' ,
  props<{leave: ILeaves }>()
  
)
export const ApproveLeaveSuccess=createAction(
  '[approve leave] Approve leave success',
  props<{leave:ILeaves}>() 
)
export const ApproveleaveFailure = createAction(
  '[Approve leave] Approve leave failure',
  props<{error:unknown}>()
)


export const loadapprovedleaves = createAction(
  '[approved leaves] get approved leaves'
)

export const loadapprovedleavesSucces =createAction(
  '[approved leaves] get approved leaves success',
  props<{leaves:ILeaves[]}>()
)
export const loadapprovedleavesFailure = createAction(
  '[approved leaves] get approved leaves Failure',
  props<{error:unknown}>()
)

export const loadEndingleaves=createAction(
  '[ending leaves] get endingleaves Failure',
)
export const loadEndingleavesSuccess=createAction(
  '[ending leaves] get ending leaves success',
  props<{leaves: ILeaves[]}>()
)
export const loadEndingleavesFailure= createAction(
  '[ending leaves] get ending leaves failure',
  props<{errorr:unknown}>()
)


export const leaveActionType = {
  Loadleaves,
  loadleavesSuccess,
  loadleavessFailure,
  Loadleave,
  loadleaveSuccess,
  loadleaveFailure,
  createleave,
  createleaveSuccess,
  createleaveFailure,
  deleleaveFailure,
  deleteleave,
  deleteleaveSuccess,
  updateleave,
  updateleaveSuccess,
  updateleaveFailure,
  loadleavesByuser,
  loadleavesByuserSuccess,
  loadapprovedleavesByUser,
  loadapprovedleavesByUserFailure,
  loadapprovedleavesByUserSuccess,
  loadadminleavehistory,
  loadadminleavehistoryFailure,
  loadadminleavehistorySucces,
  loadpendingleaves,
  loadpendingleavesSuccess,
  loadpendingleavesFailure,
  loadapprovedleaves,
  loadapprovedleavesSucces,
  loadapprovedleavesFailure,
  loadEndingleaves,
  loadEndingleavesSuccess,
  loadEndingleavesFailure,
  ApproveLeave,
  ApproveLeaveSuccess,
  ApproveleaveFailure
};
export const dummyAction = createAction('[dummy action]');
