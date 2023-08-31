import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { ILeaveType } from 'src/app/model/leave';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/deleteConfirmDialog.component';
import { LeaveTypes } from 'src/app/store/actions/leave/leavetype.actions';
import { LeaveTypeState } from 'src/app/store/reducer/leave/leavetype.reducer';
import {
  getleaveTypeById,
  getleaveTypes,
} from 'src/app/store/selector/leave/leavetype.selector';
@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss'],
  providers:[DialogService,MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveTypeComponent implements OnInit {
  subscription = new Subscription();
  leaveTypes$: Observable<ILeaveType[]>;
  leaveType: ILeaveType;
  selectleavetype: Observable<ILeaveType>;

  tableColumns: {
    fieldName: string;
    displayName: string;
  }[] = [
    {
      fieldName: 'LeaveType',
      displayName: 'Leave Type',
    },
    {
      fieldName: 'Number of Leave  Days',
      displayName: 'Number of Leave  Days',
    },
   
    
  ];

  constructor(
    private store: Store<LeaveTypeState>,
    private dialogService:DialogService,
  
    private leaveService: LeaveService,
    private router:Router
    ) {}



  ngOnInit(): void {
    this.getLeaveTypes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
  getLeaveTypes() {
    this.leaveTypes$ = this.store.pipe(select(getleaveTypes));
    this.store.dispatch(LeaveTypes.LoadleaveTypes());

    console.log(this.leaveTypes$);
  }



  deleteLeaveType(id: string) {
    this.store.dispatch(LeaveTypes.deleteLeaveType({ id: id }));
  }

  
  public openDeleteDialog(leaveType: ILeaveType): void {
    const ref = this.dialogService.open(DeleteConfirmDialogComponent, {
      width: '30%',
      height: '40%',
      header: 'Delete Confirmation',
    });

    ref.onClose.subscribe((confirm) => {
      if (confirm) {
        this.deleteLeaveType(leaveType?._id);
      }
    });
  }
  getLeavetypeById() {
    this.selectleavetype = this.store.select(getleaveTypeById);
    console.log(this.selectleavetype);
  }
  edit(id: string) {
    this.router.navigate([`/app/leave/edit-leaveType/${id}`]);
  }
}
