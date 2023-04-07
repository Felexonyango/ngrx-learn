import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { ILeaveType } from 'src/app/model/leave';
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
  isEdit: boolean = false;
  display: boolean = false;
  errorMessage: string = '';
  form = new FormGroup({});
  model= {};
  id: string;
  fields: FormlyFieldConfig[] = [
    {
      className: 'col-6',
      key: 'leavetype',
      type: 'input',
      templateOptions: {
        label: 'Leave Type Name',
        placeholder: 'Casual Leave',
        required: true,
      },
    },
    {
      key: 'numberOfDays',
      type: 'input',
      templateOptions: {
        label: 'Number of leave days',
        placeholder: '10',
        required: true,
        type: 'number',
        min: 1,
      },
    },
  ];
  constructor(
    private store: Store<LeaveTypeState>,
    private dialogService:DialogService
    ) {}

  ngOnInit(): void {
    this.getLeaveTypes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  showDialog() {
    this.display = true;
    this.errorMessage = '';
    this.form.reset();
  }
  createLeaveType() {
    this.leaveType = this.form.value;
    const leaveType: ILeaveType = { ...this.form.value };
    this.store.dispatch(LeaveTypes.createLeaveType({ leaveType }));
    this.getLeaveTypes();
    this.display = false;
    this.isEdit=false;  
    this.form.reset();
  }

  getLeaveTypes() {
    this.leaveTypes$ = this.store.pipe(select(getleaveTypes));
    this.store.dispatch(LeaveTypes.LoadleaveTypes());

    console.log(this.leaveTypes$);
  }
  UpdateLeaveType() {
    console.log('test')
    
    
    this.isEdit=true
    this.display = true;
  
  }
  updateLeavetypeModal(leave_id: string) {
    this.display = true;
    this.isEdit = true;
    this.id = leave_id;
    this.getLeavetypeById();
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
}
