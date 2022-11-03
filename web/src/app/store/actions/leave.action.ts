
import { ILeaves} from '../../model/leave';
import { Update } from '@ngrx/entity';

import { createAction, props } from '@ngrx/store';


export const Loadleaves = createAction('[leaves] Load All leaves');
export const loadleavesSuccess = createAction(
  '[leave] Load All leaves Success',
  props<{leaves:ILeaves[]}>()
)

export const loadleavessFailure = createAction(
  '[leave] Load  leaves Failure',
  props<{ error: unknown }>()
);



export const Loadleave= createAction('[leave] Load  leave');

export const loadleaveSuccess = createAction(
  '[leave] Load  leave Success',
  props<{leave:ILeaves}>()
)

export const loadleaveFailure = createAction(
  '[leave] Load  leave Failure',
  props<{ error: unknown }>()
);

export const createleave = createAction(
  '[leave] Create leave',
  props<{ leaves: ILeaves}>()
);

export const createleaveSuccess = createAction(
  '[leave] Create  leave Success',
  props<{ leaves: ILeaves}>()
);

export const createleaveFailure = createAction(
  '[leave] Create leave Failure',
  props<{ error: unknown }>()
);

export const updateleave = createAction(
  '[leave] Update leave',
  props<{ leaves:ILeaves}>());


export const updateleaveSuccess = createAction(
  '[leave] Update  leave Success',
  props<{leaves:Update<ILeaves>}>());

  

export const updateleaveFailure = createAction(
  '[leave] Update leave Failure',
  props<{ error: unknown }>()
);

export const deleteleave= createAction(
  '[leave] Delete leaves',
  props<{ id: string }>()
);
export const deleteleaveSuccess = createAction(
  '[leave] Delete leave Success',
  props<{ id: string }>()
);

export const deleleaveFailure = createAction(
  '[leave] Delete leave Failure',
  props<{error:unknown}>()
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
updateleaveFailure


  
};
export const dummyAction = createAction('[dummy action]');
