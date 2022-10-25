import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';
import { EmployeeService } from '../../services/employees.service';

import { EmployeeActionTypes } from '../actions/employee.action';
@Injectable()
export class EmployeeEffect {
  constructor(
    private actions$: Actions,
    private EmployeeService: EmployeeService
  ) {}

  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActionTypes.LoadEmployees),
      mergeMap((action) =>
        this.EmployeeService.getAllEmployees().pipe(
          map((res) =>
            EmployeeActionTypes.loadEmployeesSuccess({
              employees: res.result
            })
          ),

          catchError((error) =>
            of(EmployeeActionTypes.loadEmployeesFailure({ error }))
          )
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


}
