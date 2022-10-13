
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { HTTPResponseStatus } from 'src/app/leave-management-system/models/auth.model';

import { IUser, AuthItemType } from 'src/app/leave-management-system/models/user.model';
import { IEmployee } from 'src/app/leave-management-system/modules/employees/models/employeeModel';
import { UserService } from 'src/app/leave-management-system/services/user/user.service';
import { UtilService } from 'src/app/leave-management-system/services/util/util.service';
import { AppMainComponent } from 'src/app/primeng-atlantis-theme/app-main-layout/app.main.component';

export enum inviteStatus {
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
  }
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  employee:IEmployee;
  employeeDetailsModel



  // user: IUser;
  subscriptions = new Subscription();
  moduleType = 'PROFILEPIC';
  profilePicture: any;
  authItemType = AuthItemType;
  authItemModalRef: any;
  HTTPResponseStatus = HTTPResponseStatus;
  modalDismissed: boolean;
  isEdit: boolean;

  createUserForm = new FormGroup({});
  userDetailsModel: any;
  userFormlyFields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-6',
              key: 'firstname',
              type: 'input',
              templateOptions: {
                placeholder: 'Enter firstname',
                required: true,
              },
            },
            {
              className: 'col-6',
              key: 'lastname',
              type: 'input',
              templateOptions: {
                placeholder: 'Enter lastname',
                required: true,
              },
            },
          ],
        },
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            placeholder: 'Enter email',
            disabled: true
          },
        }
      ],
    },
  ];

  constructor(
    private userService: UserService,
    public appMain: AppMainComponent,
    private utilService: UtilService,
  ) {}

  ngOnInit(): void {
    this.getUserDetails();

  }

  getUserDetails(): void {
    this.subscriptions.add(
      this.userService.getUserProfile().subscribe({
        next: (res) => {
          this.employee = res.result;
          this.employeeDetailsModel = res.result;
          this.employeeDetailsModel.email = this.employee.authItems[0].value;
          this.utilService.userTheme = this.employee.isDarkTheme;
        },
        complete: () => {
        }
      })
    );
  }

  updateUser(): void {
    const user = {
      ...this.createUserForm.value,
    };
    this.subscriptions.add(
        this.userService.updateUserProfile(user).subscribe({
        complete: () => {
            this.getUserDetails();
            this.isEdit = false;
        },
      })
    );
  }

}
