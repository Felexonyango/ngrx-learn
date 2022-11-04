import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { concat, merge, of } from 'rxjs';
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
import { leaveActionType } from '../actions/leave.action';
import { ILeaves } from '../../model/leave';
import { LeaveService } from '../../services/leave.service';

@Injectable()
export class LeaveEFfect {
  constructor(private actions$: Actions, private leaveService: LeaveService) {}

  loadLeaveService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leaveActionType.Loadleaves),
      mergeMap((action) =>
        this.leaveService.getAllLeaves().pipe(
          map((res) =>
            leaveActionType.loadleavesSuccess({
              leaves: res.result,
            })
          )
        )
      ),
      catchError((error) => of(leaveActionType.loadleavessFailure({ error })))
    )
  );

  loadleavesByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leaveActionType.loadleavesByuser),
      mergeMap((action) =>
        this.leaveService.getLeaveRequestsByUser().pipe(
          map((res) =>
            leaveActionType.loadleavesByuserSuccess({
              leaves: res.result,
            })
          )
        )
      )
    )
  );
  loadallRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leaveActionType.loadnewleaves),
      mergeMap((action) =>
        this.leaveService.getAllNewLeaveRequests().pipe(
          map((res) =>
            leaveActionType.loadnewleavesSuccess({
              leaves: res.result,
            })
          )
        )
      )
    )
  );
  loadadminleavehistory$ = createEffect(() =>
  this.actions$.pipe(
    ofType(leaveActionType.loadadminleavehistory),
    mergeMap((action) =>
      this.leaveService.getAllLeaves().pipe(
        map((res) =>
          leaveActionType.loadadminleavehistorySucces({
            leaves: res.result,
          })
        )
      )
    )
  )
);

  createleave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leaveActionType.createleave),
      mergeMap(({ leaves }) =>
        this.leaveService
          .createLeaveRequest(leaves)
          .pipe(
            map((res) =>
              leaveActionType.createleaveSuccess({ leaves: res.result })
            )
          )
      ),
      catchError((error) => of(leaveActionType.createleaveFailure({ error })))
    )
  );
  //   createleavetype$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(LeaveTypes.createLeaveType),
  //       mergeMap(({ leaveType }) =>
  //         this.leaveTypeService
  //           .createLeavetype(leaveType)
  //           .pipe(
  //             map((res) =>
  //               LeaveTypes.createLeaveTypeSuccess({ leaveType: res.result })
  //             )
  //           )
  //       ),
  //       catchError((error) => of(LeaveTypes.createLeaveTypeFailure({ error })))
  //     )
  //   );

  deleteleaveType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(leaveActionType.deleteleave),
      switchMap(({ id }) => {
        return this.leaveService.deleteLeaveRequest(id).pipe(
          map((data) => {
            return leaveActionType.deleteleaveSuccess({ id: id });
          })
        );
      }),
      catchError((error) => of(leaveActionType.deleleaveFailure({ error })))
    );
  });

  //   update$ = createEffect(() => {
  //     return this.actions$.pipe(
  //       ofType(LeaveTypes.updateLeaveType),
  //       mergeMap(({ leaveType }) =>
  //         this.leaveTypeService.updateLeavetype(leaveType).pipe(
  //           map((data) => {
  //             const updateLeaveType: Update<ILeaveType> = {
  //               id: leaveType._id,
  //               changes: {
  //                 ...leaveType,
  //               },
  //             };
  //             return LeaveTypes.updateLeaveTypeSuccess({
  //               leaveType: updateLeaveType,
  //             });
  //           }),
  //           catchError((error) =>
  //             of(LeaveTypes.updateLeaveTypeFailure({ error }))
  //           )
  //         )
  //       )
  //     );
  //   });

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
