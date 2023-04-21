import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { concat, of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  switchMap,
  filter,
  withLatestFrom,
  tap,
 
} from 'rxjs/operators';
import { LeaveTypeService } from '../../../services/leave/leave-type.service';
import { LeaveTypeState } from '../../reducer/leave/leavetype.reducer';
import { dummyAction } from '../../actions/leave/leavetype.actions';
import { Update } from '@ngrx/entity';
import { DepartmentActionTypes } from '../../actions/department/department.actions';
import {IDepartment} from  '../../../model/department'

@Injectable()
export class DepartmentEFfect {
  constructor(
    private actions$: Actions,
    private leaveTypeService: LeaveTypeService,
    private store: Store<LeaveTypeState>
  ) {}

  loadDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActionTypes.LoadDepartments),
      mergeMap((action) =>
        this.leaveTypeService.getAllDepartments().pipe(
          map((res) =>
            DepartmentActionTypes.loadDepartmentsSuccess({
              departments: res
            })
          ),
          catchError((error) => of(DepartmentActionTypes.loadDepartmentsFailure({ error })))
        )
      )
    )
  );
  loadDepartment$ = createEffect(() =>
  this.actions$.pipe(
    ofType(DepartmentActionTypes.loadDepartment),
    switchMap((action) =>
      this.leaveTypeService.getDepartment(action.id).pipe(
        map((response) =>
          DepartmentActionTypes.loadDepartmentSuccess({department:response.result} )
        ),
        catchError((error) =>
          of(DepartmentActionTypes.loadDepartmentFailure({ error }))
        )
      )
    )
  )
);


  createDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActionTypes.createDepartment),
      mergeMap(({ department }) =>
        this.leaveTypeService
          .createDepartments(department)
          .pipe(
            map((res) =>
              DepartmentActionTypes.createDepartmentSuccess({ department: res.result })
            )
          )
      ),
      catchError((error) => of(DepartmentActionTypes.createDepartmentFailure({ error })))
    )
  );

  deleteDepartment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DepartmentActionTypes.deleteDepartment),
      switchMap(({ id }) => {
        return this.leaveTypeService.deleteDepartment(id).pipe(
          map((data) => {
            return DepartmentActionTypes.deleteDepartmentsuccess({ id: id });
          })
        );
      }),
      catchError((error) => of(DepartmentActionTypes.deleteDepartmentFailure({ error })))
    );
  });

  updateDepartment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DepartmentActionTypes.updateDepartment),
      mergeMap(({ update }) =>
        this.leaveTypeService.updateDepartment(String(update.id), update.changes).pipe(
          map((data) => {
      
            return DepartmentActionTypes.updateDepartmentSuccess({ update });
          }),
          catchError((error) =>
            of(DepartmentActionTypes.updateDepartmentFailure({ error }))
          )
        )
      )
    );
  });

}