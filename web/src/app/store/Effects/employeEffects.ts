import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError} from 'rxjs/operators';
import {EmployeeService} from '../../services/employees.service'
import {EmployeeActionTypes} from '../../store/actions/actionTypes'
import { IEmployee} from '../../model/employees';
import * as EmployeeAction from '../actions/employee.action'
@Injectable()
export class EmployeeEffect {
  constructor(
    private actions$: Actions,
    private EmployeeService: EmployeeService
  ) {}
  
  loadEmployes$=createEffect(()=>this.actions$.pipe(
    ofType(EmployeeActionTypes.LOAD_EMPLOYEES),
    mergeMap((action: EmployeeAction.Loademployees) =>
      this.EmployeeService.getAllEmployees().pipe(
        map((employees:IEmployee[]) =>
            new EmployeeAction.LoademployeesSuccess(employees)),
        catchError(err => of(new EmployeeAction.Loademployeefail(err)))
      )
    )
  ))

  loadEmployee$= createEffect(() =>this.actions$.pipe(
    ofType(EmployeeActionTypes.LOAD_EMPLOYEE),
    mergeMap((action:EmployeeAction.LoadEmployee)=>
    this.EmployeeService.getEmployeeByID(action.payload).pipe(
      map((employee:IEmployee) => new EmployeeAction.Loademployeesucess(employee)),
    )
  ))
  )

  
   createEmployee$= createEffect(() =>this.actions$.pipe(
    ofType(EmployeeActionTypes.CREATE_EMPLOYEE),
    map((action:EmployeeAction.createemployee) =>action.payload),
    mergeMap((employee:IEmployee) =>this.EmployeeService.createEmployee(employee).pipe(
      map((employee:IEmployee) => new EmployeeAction.createemployeesucess(employee)),
      catchError(err => of(new EmployeeAction.createemployeefail(err)))
    ))
   ))





//   @Effect()
//   loadProposal$: Observable<Action> = this.actions$.pipe(
//     ofType<proposalActions.LoadProposal>(
//       proposalActions.ProposalActionTypes.LOAD_PROPOSAL
//     ),
//     mergeMap((action: proposalActions.LoadProposal) =>
//       this.EmployeeService.getProposalById(action.payload).pipe(
//         map(
//           (proposal: Proposal) =>
//             new proposalActions.LoadProposalSuccess(proposal)
//         ),
//         catchError(err => of(new proposalActions.LoadProposalFail(err)))
//       )
//     )
//   );

//   @Effect()
//   createProposal$: Observable<Action> = this.actions$.pipe(
//     ofType<proposalActions.CreateProposal>(
//       proposalActions.ProposalActionTypes.CREATE_PROPOSAL
//     ),
//     map((action: proposalActions.CreateProposal) => action.payload),
//     mergeMap((proposal: Proposal) =>
//       this.EmployeeService.createProposal(proposal).pipe(
//         map(
//           newIEmployee=>
//             new proposalActions.CreateProposalSuccess(newProposal)
//         ),
//         catchError(err => of(new proposalActions.CreateProposalFail(err)))
//       )
//     )
//   );

//   @Effect()
//   updateProposal$ = this.actions$.pipe(
//     ofType<proposalActions.UpdateProposal>(
//       proposalActions.ProposalActionTypes.UPDATE_PROPOSAL
//     ),
//     map((action: proposalActions.UpdateProposal) => action.payload),
//     mergeMap((proposal: Proposal) =>
//       this.EmployeeService.updateProposal(proposal).pipe(
//         map(
//           (updateProposal: Proposal) =>
//             new proposalActions.UpdateProposalSuccess({
//               id: updateProposal.id,
//               changes: updateProposal
//             })
//         ),
//         catchError(err => of(new proposalActions.UpdateProposalFail(err)))
//       )
//     )
//   );

//   @Effect()
//   deleteProposal$: Observable<Action> = this.actions$.pipe(
//     ofType(proposalActions.ProposalActionTypes.DELETE_PROPOSAL),
//     map((action: proposalActions.DeleteProposal) => action.payload),
//     mergeMap((id: number) =>
//       this.EmployeeService.deleteProposal(id).pipe(
//         map(() => new proposalActions.DeleteProposalSuccess(id)),
//         catchError(err => of(new proposalActions.DeleteProposalFail(err)))
//       )
//     )
//   );

// 

  }
