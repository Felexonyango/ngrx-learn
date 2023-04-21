import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Paginator } from 'primeng/paginator';
import { Observable, Subscription } from 'rxjs';
import { IEmployee } from 'src/app/model/employees';
import { ILeaves } from 'src/app/model/leave';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { UtilService } from 'src/app/services/util/util.service';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/deleteConfirmDialog.component';
import { leaveActionType } from 'src/app/store/actions/leave/leave.action';
import { LeaveState } from 'src/app/store/reducer/leave/leaveReducer';
import { getleaves } from 'src/app/store/selector/leave/leave.selector';
@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.scss'],
  providers:[DialogService,MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveHistoryComponent implements OnInit {
  Ileaves: Observable<ILeaves[]>;

  employee: IEmployee;

  id
  imageToShow: any;
  subscription = new Subscription();
  display: boolean;
  initials: string;

  constructor(
    private leavService: LeaveService,
     private dialogService:DialogService,
    private router: Router,
    public utilservice:UtilService,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    private store: Store<LeaveState>
  ) {}

  @ViewChild('paginator', { static: true }) paginator: Paginator;

  leaveTableColumns: string[] = [
    'leaveType',
    
    'startDate',
    'EndDate',
    'status',
    
  ];

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getLeaveHistroy();
  }

  getLeaveDetails <T>(id:T){
    this.subscription.add(
      this.leavService.getLeaveRequestDetail(id).subscribe((res) => {})
    );
  }

   getLeaveHistroy() {
    this.Ileaves = this.store.pipe(select(getleaves));
    this.store.dispatch(leaveActionType.loadleavesByuser());
  }

  handleSelect(id: string) {
    this.router.navigate([`/leave/leaves/details/${id}`]);
  }
  updateLeave(id: string) {
    this.router.navigate([`/leave/leaves/apply/${id}`]);
  }


  deleteLeaveDialog() {
    this.display = true;
  }
  cancelDeleteLeaveDialog() {
    this.display = false;
  }

  onDeleteleave(id: any) {
    this.store.dispatch(leaveActionType.deleteleave({ id}))
  }
  onEditBtnClick(id:string) {
    this.router.navigate([`/leave/edit-leaveId/${id}`]);
  }

  onView(id: any) {
    this.router.navigate([`/leave/leave-details/${id}`]);
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
