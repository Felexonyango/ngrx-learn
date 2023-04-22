import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Paginator } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { ILeaves } from 'src/app/model/leave';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/deleteConfirmDialog.component';
import { leaveActionType } from 'src/app/store/actions/leave/leave.action';
import { LeaveState } from 'src/app/store/reducer/leave/leaveReducer';
import { getleaves } from 'src/app/store/selector/leave/leave.selector';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrls: ['./all-leaves.component.scss'],
  providers:[DialogService,MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllLeavesComponent implements OnInit {
  leaves:Observable<ILeaves[]>
  constructor(
    private leaveService: LeaveService,
    private store:Store<LeaveState>,
    private router:Router,
    private dialogService:DialogService
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
    
    
  ];
  getadminleaveshistory(){
    this.leaves = this.store.pipe(select(getleaves));
    this.store.dispatch( leaveActionType.loadadminleavehistory() )
  }
  onView<T>(id:T) {
    this.router.navigate([`/leave/leave-details/${id}`]);
  }
  onEditBtnClick(id:string){
    this.router.navigate([`/leave/edit-leaveId/${id}`]);
  }
  
  onDeleteleave<T extends string >(id:T) {
    this.store.dispatch(leaveActionType.deleteleave({ id}))
  }


  public openDeleteDialog(approvedleaves: ILeaves): void {
    const ref = this.dialogService.open(DeleteConfirmDialogComponent, {
      width: '30%',
      height: '40%',
      header: 'Delete Confirmation',
    });

    ref.onClose.subscribe((confirm) => {
      if (confirm) {
        this.onDeleteleave(approvedleaves?._id);
      }
    });
  }
}
