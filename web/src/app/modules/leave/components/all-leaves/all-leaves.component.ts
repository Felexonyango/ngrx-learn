import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Paginator } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { ILeaves } from 'src/app/model/leave';
import { LeaveService } from 'src/app/services/leave.service';
import { leaveActionType } from 'src/app/store/actions/leave.action';
import { LeaveState } from 'src/app/store/reducer/leaveReducer';
import { getleaves } from 'src/app/store/selector/leave.selector';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrls: ['./all-leaves.component.scss']
})
export class AllLeavesComponent implements OnInit {
  leaves:Observable<ILeaves[]>
  constructor(
    private leaveService: LeaveService,
    private store:Store<LeaveState>,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getadminleaveshistory()
  }

  @ViewChild('paginator', { static: true }) paginator: Paginator;

  leaveTableColumns: string[] = [
    'Employee Name',
    'leaveType',
    'startDate',
    'EndDate',
    'status',
    'Action'
    
  ];
  getadminleaveshistory(){
    this.leaves = this.store.pipe(select(getleaves));
    this.store.dispatch( leaveActionType.loadadminleavehistory() )
  }
  onView(id: any) {
    this.router.navigate([`/leave/leave-details/${id}`]);
  }
  onEditBtnClick(id:string){}
  
  onDeleteleave(id: any) {
    this.store.dispatch(leaveActionType.deleteleave({ id}))
  }
}
