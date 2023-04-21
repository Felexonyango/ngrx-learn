import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { ILeaveType, ILeaves } from 'src/app/model/leave';
import { select, Store } from '@ngrx/store';
import { LeaveState } from 'src/app/store/reducer/leave/leaveReducer';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { applyLeaveFormlyFields } from './apply-leave-formly';
import { LeaveTypes } from 'src/app/store/actions/leave/leavetype.actions';
import { getleaveTypes } from 'src/app/store/selector/leave/leavetype.selector';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-leave',
  templateUrl: './create-leave.component.html',
  styleUrls: ['./create-leave.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class CreateLeaveComponent implements OnInit {
  subscription = new Subscription();
  leave: ILeaves;
  minimumDate = new Date();
  minimumEndDate = new Date();
  dates = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  applyLeaveForm = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  application;
  isEdit = false;
  leaveType: ILeaveType[] = [];

  constructor(
    private leaveService: LeaveService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateOptions();
    this.getLeaveTypes();
    this.getLeaveIdFromParam();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitApplication() {
    const leaveModel = this.applyLeaveForm.value;
    const submitUrl = this.isEdit
      ? this.leaveService.updateLeaveRequest(this.leave?._id, leaveModel)
      : this.leaveService.createLeaveRequest(leaveModel);
    this.subscription.add(
      submitUrl.subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: ' successfully created leave',
          });
          this.applyLeaveForm.reset();
        },
        complete: () => {
          this.router.navigate(['/leave/request/history']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'warn',
            summary: "Couldn't Add a leave",
            detail: err?.error?.errors?.message
              ? err?.error?.errors?.message
              : '',
          });
        },
      })
    );
  }

  updateOptions() {
    this.fields = applyLeaveFormlyFields;
    this.fields[0].fieldGroup[0].props.options =
      this.leaveService.getLeaveTypes();
  }
  getLeaveTypes() {
    this.subscription.add(
      this.leaveService.getLeaveType().subscribe({
        next: (res) => {
          this.leaveType = res.result;
        },
      })
    );
  }

  getLeaveIdFromParam(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (param) => {
          const leaveId = param['leaveId'];
          this.getLeaveById(leaveId);
        },
      })
    );
  }
  getLeaveById(leaveId: string) {
    this.subscription.add(
      this.leaveService.getLeaveRequestDetail(leaveId).subscribe({
        next: (res) => {
          this.leave = res.result;
          this.model = res.result;
          this.isEdit=true
        },
      })
    );
  }
}
