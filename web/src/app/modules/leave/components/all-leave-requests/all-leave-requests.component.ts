import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Paginator } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { ILeaves } from 'src/app/model/leave';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { leaveActionType } from 'src/app/store/actions/leave/leave.action';
import { LeaveState } from 'src/app/store/reducer/leave/leaveReducer';
import { getleaves } from 'src/app/store/selector/leave/leave.selector';

@Component({
  selector: 'app-all-leave-requests',
  templateUrl: './all-leave-requests.component.html',
  styleUrls: ['./all-leave-requests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllLeaveRequestsComponent implements OnInit {
leaves:Observable<ILeaves[]>
  constructor(
    private leaveService: LeaveService,
    private store: Store<LeaveState>,
    private router: Router
  ) { }


  @ViewChild('paginator', { static: true }) paginator: Paginator;

  leaveTableColumns: string[] = [
    'Employee Name',
    'leaveType',
    'leaveDuration',
    'startDate',
    'EndDate',
    'status',
   
    
  ];
  ngOnInit(): void {

    this.getNewLeaveRequests()
  }

  
  getNewLeaveRequests(){
    this.leaves = this.store.pipe(select(getleaves));
    //this.store.dispatch( leaveActionType.loadnewleaves() )
  }
  onView <T>(id: T) {
    this.router.navigate([`/app/leave/leave-details/${id}`]);
  }
  onEditBtnClick(id:string){


  }
  onDeleteleave<T extends string>(id: T) {
    this.store.dispatch(leaveActionType.deleteleave({ id}))
  }
}
