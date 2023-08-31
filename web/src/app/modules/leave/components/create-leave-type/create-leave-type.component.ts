import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription, Observable } from 'rxjs';
import { ILeaveType } from 'src/app/model/leave';
import { LeaveTypeService } from 'src/app/services/leave/leave-type.service';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { UtilService } from 'src/app/services/util/util.service';
import { LeaveTypes } from 'src/app/store/actions/leave/leavetype.actions';

@Component({
  selector: 'app-create-leave-type',
  templateUrl: './create-leave-type.component.html',
  styleUrls: ['./create-leave-type.component.scss'],
})
export class CreateLeaveTypeComponent implements OnInit {
  subscription = new Subscription();
  leaveTypes$: Observable<ILeaveType[]>;
  leaveType: ILeaveType;
  selectleavetype: Observable<ILeaveType>;
  isEdit: boolean = false;
  display: boolean = false;
  errorMessage: string = '';
  form = new FormGroup({});
  model = {};
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
  leavetypeId: string;
  constructor(
    public utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private leaveService: LeaveTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLeaveTypeIdFromParam();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  CreateOrUpdateLeaveType() {
    const leaveType = {
      ...this.model,
    };
    const submitUrl = this.isEdit
      ? this.leaveService.updateLeavetype(this.leaveType?._id, leaveType)
      : this.leaveService.createLeavetype(leaveType);
    this.subscription.add(
      submitUrl.subscribe({
        next: (res) => {
          this.router.navigateByUrl('/app/leave/leave-setting');
          this.form.reset();
        },
      })
    );
  }
  getLeaveTypeIdFromParam(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (param) => {
          const leaveTypeId = param['leaveTypeId'];
          this.getLeaveTypeById(leaveTypeId);
          this.leavetypeId = leaveTypeId;
          console.log(this.leavetypeId);
        },
      })
    );
  }
  getLeaveTypeById(leaveTypeId: string) {
    this.subscription.add(
      this.leaveService.getLeavetypeByID(leaveTypeId).subscribe({
        next: (res) => {
          this.leaveType = res.result;
          this.model = res.result;
          this.leavetypeId = leaveTypeId;
          this.isEdit = true;
        },
      })
    );
  }
}
