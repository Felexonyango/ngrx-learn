import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Paginator } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { ILeaves } from 'src/app/model/leave';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/deleteConfirmDialog.component';
import { leaveActionType } from 'src/app/store/actions/leave/leave.action';
import { LeaveState } from 'src/app/store/reducer/leave/leaveReducer';
import { getleaves } from 'src/app/store/selector/leave/leave.selector';

@Component({
  selector: 'app-approved-leaves',
  templateUrl: './approved-leaves.component.html',
  styleUrls: ['./approved-leaves.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService, MessageService],
})
export class ApprovedLeavesComponent implements OnInit {
  approvedleaves$: Observable<ILeaves[]>;
  constructor(
    private store: Store<LeaveState>,
    private router: Router,
    private dialogService: DialogService
  ) {}
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  leaveTableColumns: string[] = [
    'Employee Name',
    'leaveType',
    'startDate',
    'EndDate',
    'status',
  ];

  ngOnInit(): void {
    this.getApprovedleaves();
  }

  getApprovedleaves() {
    this.approvedleaves$ = this.store.pipe(select(getleaves));
    this.store.dispatch(leaveActionType.loadapprovedleaves());
  }
  handleSelect(id: string) {
    this.router.navigate([`/leave/leave-details/${id}`]);
  }
  onView(id: string) {
    this.router.navigate([`/leave/leave-details/${id}`]);
  }
  onEditBtnClick(id: string) {}
  onDeleteleave(id: string) {
    this.store.dispatch(leaveActionType.deleteleave({ id }));
  }

  public openDeleteDialog(approvedleaves: ILeaves): void {
    const ref = this.dialogService.open(DeleteConfirmDialogComponent, {
      width: '30%',
      height: '35%',
      header: 'Delete Confirmation',
    });

    ref.onClose.subscribe((confirm) => {
      if (confirm) {
        this.onDeleteleave(approvedleaves?._id);
      }
    });
  }
}
