import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { concat, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, tap, filter, withLatestFrom, concatMap } from 'rxjs/operators';
import { EmployeeService } from '../../../services/employee/employees.service';
import {  State } from 'src/app/store/reducer/employee/employeeReducer'
import { EmployeeActionTypes, updateEmployeeSuccess } from '../../actions/employee/employee.action';
import { getEmployees } from '../../selector/employee/employee.selector';
import { dummyAction } from '../../actions/employee/employee.action';
import { Update } from '@ngrx/entity';
import { IEmployee } from 'src/app/model/employees';
@Injectable()
export class EmployeeEffect {
  constructor(
    private actions$: Actions,
    private EmployeeService: EmployeeService,
    private store: Store<State>
  ) {}

  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActionTypes.LoadEmployees),
      mergeMap(() => this.EmployeeService.getAllEmployees()
      .pipe(
       
        map((res)=>EmployeeActionTypes.loadEmployeesSuccess({
          employees:res.result
        })),
        catchError((error)=> of(EmployeeActionTypes.loadEmployeesFailure({error})))

      )

      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActionTypes.createEmployee),
      switchMap(({ employee }) =>
        this.EmployeeService.createEmployee(employee).pipe(
          map((result) =>
            EmployeeActionTypes.createEmployeeSuccess({ employee: result })
          ),
          catchError((error) =>
            of(EmployeeActionTypes.createEmployeeFailure({ error }))
          )
        )
      )
    )
  );


  deleteEmployee$ = createEffect(() => {
    return this.actions$.pipe(ofType(EmployeeActionTypes.deleteEmployee),
      switchMap(({id}) => {
        return this.EmployeeService.deleteEmployee(id).pipe(
          map((data) => {
            return  EmployeeActionTypes.deleteEmployeeSuccess({ id:id });
          })
        );
      }),
      catchError((error) =>
      of(EmployeeActionTypes.deleEmployeeFailure({ error }))
    )
    );
  });

//to get employeeById
  // getSingleEmployee$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ROUTER_NAVIGATION),
  //     filter((r: RouterNavigatedAction) => {
  //       return r.payload.routerState.url.startsWith('/employees/employee');
  //     }),
  //     map((r: RouterNavigatedAction) => {
  //       return r.payload.routerState['params']['id'];
  //     }),
  //     withLatestFrom(this.store.select(getEmployees)),
  //     switchMap(([id, employees]) => {
  //       if (!employees.length) {
  //         return this.EmployeeService.getEmployeeByID(id).pipe(
  //           map((employee) => {
  //             const employeeData = [{ ...employee, id }];
  //             tap((obj)=>console.log(obj,'dedhehdjh'))
  //             return EmployeeActionTypes.loadEmployeesSuccess({employees: employeeData});
  //           }),
  //           catchError((error) =>
  //           of(EmployeeActionTypes.loadEmployeeFailure({ error }))
  //         )
  //         );
  //       }
  //       return of(dummyAction());
  //     })
  //   );
  // });


  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeActionTypes.updateEmployee),
      switchMap(({ update }) => {
        return this.EmployeeService.updateEmployee(String(update.id), update.changes).pipe(
          map((data) => {
            return updateEmployeeSuccess({ update });
          }),
          tap((action) => {
            console.log(action.update.id);
          })
        );
      }),
      catchError((error) => of(EmployeeActionTypes.updateEmployeeFailure({ error })))
    );
  });
  

}

