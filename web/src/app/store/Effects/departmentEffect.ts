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
 
} from 'rxjs/operators';
import { LeaveTypeService } from '../../services/leave-type.service';
import { LeaveTypeState } from '../reducer/leavetype.reducer';
import { dummyAction } from '../actions/leavetype.actions';
import { Update } from '@ngrx/entity';
import { DepartmentActionTypes } from '../actions/department.actions';
import {IDepartment} from  './../../../app/model/department'

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
              departments: res.result,
            })
          ),
          catchError((error) => of(DepartmentActionTypes.loadDepartmentsFailure({ error })))
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

//   updateDepartment$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(DepartmentActionTypes.updateDepartment),
//       mergeMap(({ department }) =>
//         this.leaveTypeService.updateDepartment(department).pipe(
//           map((data) => {
//             const updateDepartment: Update<IDepartment> = {
//               id: department?._id,
//               changes: {
//                 ...department,
//               },
//             };
//             return DepartmentActionTypes.updateDepartmentSuccess({
//               department: updateDepartment,
//             });
//           }),
//           catchError((error) =>
//             of(LeaveTypes.updateLeaveTypeFailure({ error }))
//           )
//         )
//       )
//     );
//   });

    // getSingleEmployee$ = createEffect(() => {
    //   return this.actions$.pipe(
    //     ofType(ROUTER_NAVIGATION),
    //     filter((r: RouterNavigatedAction) => {
    //       return r.payload.routerState.url.startsWith('/employees/employee');
    //     }),
    //     map((r: RouterNavigatedAction) => {
    //       return r.payload.routerState['params']['id'];
    //     }),
    //     withLatestFrom(this.store.select(getleaveTypes)),
    //     switchMap(([id, leaveType]) => {
    //       if (!leaveType.length) {
    //         return this.leaveTypeService.getLeavetypeByID(id).pipe(
    //           map((ileaveType) => {
    //             const leaveTypeData = [{ ...ileaveType, id }];
    //           return LeaveTypes.loadLeaveTypesSuccess({leaveType:leaveTypeData});
    //           }),
    //           catchError((error) =>
    //           of(LeaveTypes.loadLeaveTypesFailure({ error }))
    //         )
    //         );
    //       }
    //       return of(dummyAction());
    //     })
    //   );
    // });

}