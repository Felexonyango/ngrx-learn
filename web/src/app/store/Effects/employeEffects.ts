import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { concat, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, tap, filter, withLatestFrom, concatMap } from 'rxjs/operators';
import { EmployeeService } from '../../services/employees.service';
import {  State } from 'src/app/store/reducer/employeeReducer'
import { EmployeeActionTypes, updateEmployeeSuccess } from '../actions/employee.action';
import { getEmployees } from '../selector/employee.selector';
import { dummyAction } from '../actions/employee.action';
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
        tap((obj)=>console.log(obj)),
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


  getSingleEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/employees/employee');
      }),
      map((r: RouterNavigatedAction) => {
        return r.payload.routerState['params']['id'];
      }),
      withLatestFrom(this.store.select(getEmployees)),
      switchMap(([id, employees]) => {
        if (!employees.length) {
          return this.EmployeeService.getEmployeeByID(id).pipe(
            map((employee) => {
              const employeeData = [{ ...employee, id }];
            return EmployeeActionTypes.loadEmployeesSuccess({employees: employeeData});
            }),
            catchError((error) =>
            of(EmployeeActionTypes.loadEmployeeFailure({ error }))
          )
          );
        }
        return of(dummyAction());
      })
    );
  });


  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeActionTypes.updateEmployee),
      switchMap(({employee}) => {
        return this.EmployeeService.updateEmployee(employee).pipe(
          map((data) => {
            const updateEmployee: Update<IEmployee> = {
              id: employee._id,
              changes: {
                ...employee,
              },
            };
            return updateEmployeeSuccess({ update: updateEmployee});
          })
        );
      }),
      catchError((error) =>
      of(EmployeeActionTypes.updateEmployeeFailure({ error }))
    )
    );
  });

}

