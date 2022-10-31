
import { IDepartment } from '../../model/department';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const LoadDepartment = createAction(
  '[Department] Load All departments'
  );
export const loadDepartmentsSuccess = createAction(
  '[Department] Load All ddepartment Success',
  props<{departments:IDepartment[]}>()
);

export const loadDepartmentsFailure = createAction(
  '[Department] Load  department Failure',
  props<{ error: unknown }>()
);

export const loadDepartment = createAction(
  '[Department] Load department ',
  props<{ id: string }>()
);

export const loadDepartmentSuccess = createAction(
  '[Department] Load  department Success',
  props<{ departments: IDepartment[] }>()
);

export const loadDepartmentFailure = createAction(
  '[Department] Load department Failure',
  props<{ error: unknown }>()
);

export const createDepartment = createAction(
  '[Department] Create department',
  props<{ department: IDepartment }>()
);

export const createDepartmentSuccess = createAction(
  '[Department] Create  department Success',
  props<{ department: IDepartment }>()
);

export const createDepartmentFailure = createAction(
  '[Department] Create department Failure',
  props<{ error: unknown }>()
);

export const updateDepartment = createAction(
  '[Department] Update department',
  props<{ department:IDepartment}>());


export const updateDepartmentSuccess = createAction(
  '[Department] Update  department Success',
  props<{department:Update<IDepartment>}>());

export const updateDepartmentFailure = createAction(
  '[Department] Update department Failure',
  props<{ error: unknown }>()
);

export const deleteDepartment= createAction(
  '[Department] Delete department',
  props<{ id: string }>()
);
export const deleteDepartmentsuccess = createAction(
  '[Department] Delete department Success',
  props<{ id: string }>()
);

export const deleteDepartmentFailure = createAction(
  '[Department] Delete department Failure',
  props<{error:unknown}>()
)

export const DepartmentActionTypes = {
  loadDepartment,
  loadDepartmentFailure,
  loadDepartmentSuccess,
  loadDepartmentsFailure,
  loadDepartmentsSuccess,
  createDepartment,
  createDepartmentSuccess,
  createDepartmentFailure,
  updateDepartment,
  updateDepartmentSuccess,
  updateDepartmentFailure,
  deleteDepartment,
  deleteDepartmentsuccess,
  deleteDepartmentFailure
  
  
};
export const dummyAction = createAction('[dummy action]');
