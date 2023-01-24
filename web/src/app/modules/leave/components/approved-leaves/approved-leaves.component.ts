import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Paginator } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { ILeaves } from 'src/app/model/leave';
import { leaveActionType } from 'src/app/store/actions/leave.action';
import { LeaveState } from 'src/app/store/reducer/leaveReducer';
import { getleaves } from 'src/app/store/selector/leave.selector';

@Component({
  selector: 'app-approved-leaves',
  templateUrl: './approved-leaves.component.html',
  styleUrls: ['./approved-leaves.component.scss']
})
export class ApprovedLeavesComponent implements OnInit {
  approvedleaves$:Observable<ILeaves[]>
  constructor(
    private store: Store<LeaveState>,
    private router: Router,
  ) { 
  
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

  ngOnInit(): void {
    this.getApprovedleaves();
  }

  getApprovedleaves() {
    this.approvedleaves$ = this.store.pipe(select(getleaves));
    this.store.dispatch(leaveActionType.loadapprovedleaves());
  }
  handleSelect(id: string) {
    this.router.navigate([`/leave/leave-details/${id}`])
  }
  onView(id:string){
    this.router.navigate([`/leave/leave-details/${id}`]);
  }
  onEditBtnClick(id:string){
    
  }
  onDeleteleave(id:string){
    this.store.dispatch(leaveActionType.deleteleave({ id}))
  }


}
