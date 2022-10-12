import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/leave-management-system/models/user.model';
import { UserService } from 'src/app/leave-management-system/services/user/user.service';
import { UtilService } from 'src/app/leave-management-system/services/util/util.service';

enum RoleAction {
  ASSIGN = 'ASSIGN',
  UNASSIGN = 'UNASSIGN',
}

enum ComponentAction {
  CREATE = 'CREATE',
  EDITUSER = 'EDITUSER',
  EDITPROFILE = 'EDITPROFILE',
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  createUserForm = new FormGroup({});
  userDetailsModel = {};
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
                label: 'Firstname',
                placeholder: 'Enter firstname',
                required: true,
              },
            },
            {
              className: 'col-6',
              key: 'lastname',
              type: 'input',
              templateOptions: {
                label: 'Lastname',
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
            label: 'Email',
            placeholder: 'Enter email',
          },
        }
      ],
    },
  ];

  subscriptions = new Subscription();
  user: IUser;
  userRolesArray: string[] = [];
  roleAction = RoleAction;
  isLoadingClinics = false;
  componentActionsEnum = ComponentAction;
  componentAction: ComponentAction = ComponentAction.CREATE;
  isEdit = false;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getUserIdFromParam();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  createUpdateUser(): void {
    const user = {
      ...this.createUserForm.value,
    };
    const submitUrl =
      this.componentAction === this.componentActionsEnum.EDITPROFILE
        ? this.userService.updateUserProfile(user)
        : this.componentAction === this.componentActionsEnum.EDITUSER
        ? this.userService.updateUser(user, this.user._id)
        : this.userService.createUser(user);

    this.subscriptions.add(
      submitUrl.subscribe({
        complete: () => {
          this.utilService.goBack();
        },
      })
    );
  }



  getUserDetails(userId: string): void {
    const submitURL =
      this.componentAction === this.componentActionsEnum.EDITUSER
        ? this.userService.getUserById(userId)
        : this.userService.getUserProfile();

    submitURL.subscribe({
      next: (res) => {
        this.user = res.result;
        this.userDetailsModel = {
          ...this.user,
          email: this.user.authItems[0].value,
        };
      },
    });
  }
  getUserIdFromParam(): void {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe({
        next: (param) => {
          const userId = param.userId;
          if (userId) {
            this.isEdit = true;
            this.componentAction =
              userId === 'MYPROFILE'
                ? this.componentActionsEnum.EDITPROFILE
                : this.componentActionsEnum.EDITUSER;
            this.getUserDetails(userId);

          }
          this.formlyFieldsUpdate();
        },
      })
    );
  }
  formlyFieldsUpdate() {
    if (this.isEdit) {
    const emailField = this.userFormlyFields[0].fieldGroup.find(
      (x) => x.key === 'email'
    );
    emailField.templateOptions.disabled = true;
  } else {
    const emailField = this.userFormlyFields[0].fieldGroup.find(
      (x) => x.key === 'email'
    );
    emailField.templateOptions.disabled = false;
    }
  }
}
