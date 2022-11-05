import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Paginator } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { ILeaves } from 'src/app/model/leave';
import { LeaveService } from 'src/app/services/leave.service';
import { leaveActionType } from 'src/app/store/actions/leave.action';
import { LeaveState } from 'src/app/store/reducer/leaveReducer';
import { getleaves } from 'src/app/store/selector/leave.selector';

@Component({
  selector: 'app-all-leave-requests',
  templateUrl: './all-leave-requests.component.html',
  styleUrls: ['./all-leave-requests.component.scss']
})
export class AllLeaveRequestsComponent implements OnInit {
leaves:Observable<ILeaves[]>
  constructor(
    private leaveService: LeaveService,
    private store: Store<LeaveState>
  ) { }


  @ViewChild('paginator', { static: true }) paginator: Paginator;

  leaveTableColumns: string[] = [
    'Employee Name',
    'leaveType',
    'leaveDuration',
    'startDate',
    'EndDate',
    'status',
    'Action'
    
  ];
  ngOnInit(): void {

    this.getNewLeaveRequests()
  }

  getNewLeaveRequests(){
    this.leaves = this.store.pipe(select(getleaves));
    this.store.dispatch( leaveActionType.loadnewleaves() )
  }
  onView(id:string){

  }
  onEditBtnClick(id:string){


  }
  onDeleteleave(id: any) {
    this.store.dispatch(leaveActionType.deleteleave({ id}))
  }
}
