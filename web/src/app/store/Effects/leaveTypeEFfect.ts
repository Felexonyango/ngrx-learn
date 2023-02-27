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
import { LeaveTypeService } from '../../services/leave/leave-type.service';
import { LeaveTypeState } from '../reducer/leavetype.reducer';
import { dummyAction } from '../actions/leavetype.actions';
import { Update } from '@ngrx/entity';
import { LeaveTypes } from '../actions/leavetype.actions';
import { ILeaveType } from 'src/app/model/leave';
import { updateEmployee } from '../actions/employee.action';
import { getleaveTypes } from '../selector/leavetype.selector';

@Injectable()
export class LeaveTypeEFfect {
  constructor(
    private actions$: Actions,
    private leaveTypeService: LeaveTypeService,
    private store: Store<LeaveTypeState>
  ) {}

  loadLeaveTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveTypes.LoadleaveTypes),
      mergeMap((action) =>
        this.leaveTypeService.getAllLeaveTypes().pipe(
          map((res) =>
            LeaveTypes.loadLeaveTypesSuccess({
              leaveType: res.result
            })
          ),
          catchError((error) => of(LeaveTypes.loadLeaveTypesFailure({ error })))
        )
      )
    )
  );

  createleavetype$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveTypes.createLeaveType),
      mergeMap(({ leaveType }) =>
        this.leaveTypeService
          .createLeavetype(leaveType)
          .pipe(
            map((res) =>
              LeaveTypes.createLeaveTypeSuccess({ leaveType: res.result })
            )
          )
      ),
      catchError((error) => of(LeaveTypes.createLeaveTypeFailure({ error })))
    )
  );

  deleteleaveType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeaveTypes.deleteLeaveType),
      switchMap(({ id }) => {
        return this.leaveTypeService.deleteLeavetype(id).pipe(
          map((data) => {
            return LeaveTypes.deleteLeaveTypeSuccess({ id: id });
          })
        );
      }),
      catchError((error) => of(LeaveTypes.deleLeaveTypeFailure({ error })))
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LeaveTypes.updateLeaveType),
      mergeMap(({ leaveType }) =>
        this.leaveTypeService.updateLeavetype(leaveType).pipe(
          map((data) => {
            const updateLeaveType: Update<ILeaveType> = {
              id: leaveType._id,
              changes: {
                ...leaveType,
              },
            };
            return LeaveTypes.updateLeaveTypeSuccess({
              leaveType: updateLeaveType,
            });
          }),
          catchError((error) =>
            of(LeaveTypes.updateLeaveTypeFailure({ error }))
          )
        )
      )
    );
  });

    getSingleEmployee$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter((r: RouterNavigatedAction) => {
          return r.payload.routerState.url.startsWith('/employees/employee');
        }),
        map((r: RouterNavigatedAction) => {
          return r.payload.routerState['params']['id'];
        }),
        withLatestFrom(this.store.select(getleaveTypes)),
        switchMap(([id, leaveType]) => {
          if (!leaveType.length) {
            return this.leaveTypeService.getLeavetypeByID(id).pipe(
              map((ileaveType) => {
                const leaveTypeData = [{ ...ileaveType, id }];
              return LeaveTypes.loadLeaveTypesSuccess({leaveType:leaveTypeData});
              }),
              catchError((error) =>
              of(LeaveTypes.loadLeaveTypesFailure({ error }))
            )
            );
          }
          return of(dummyAction());
        })
      );
    });

  //   updatePost$ = createEffect(() => {
  //     return this.actions$.pipe(
  //       ofType(EmployeeActionTypes.updateEmployee),
  //       concatMap(({employee}) => {
  //         return this.EmployeeService.updateEmployee(employee).pipe(
  //           map((data) => {
  //             const updateEmployee: Update<IEmployee> = {
  //               id: employee._id,
  //               changes: {
  //                 ...employee,
  //               },
  //             };
  //             return updateEmployeeSuccess({ employee: updateEmployee});
  //           })
  //         );
  //       }),
  //       catchError((error) =>
  //       of(EmployeeActionTypes.updateEmployeeFailure({ error }))
  //     )
  //     );
  //   });

  // }
}
