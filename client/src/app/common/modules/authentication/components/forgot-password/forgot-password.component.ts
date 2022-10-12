import { AppComponent } from 'src/app/app.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { projectConstants } from 'src/app/project-constants/project.constants';
import { HTTPResponseStatus } from 'src/app/leave-management-system/models/auth.model';
import { AuthService } from 'src/app/leave-management-system/services/auth/auth.service';
import { UtilService } from 'src/app/leave-management-system/services/util/util.service';
import { Password } from 'primeng/password';


enum ComponentStates {
  FORGOTPASSWORD = 'FORGOTPASSWORD',
  RESETPASSWORD = 'RESETPASSWORD'
}
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    projectConstants = projectConstants;
    currentYear = new Date().getFullYear();

  subscription = new Subscription();
  ComponentStates = ComponentStates;
  componentCurrentState = ComponentStates.FORGOTPASSWORD;

  forgotPassword: boolean;
  forgotPasswordForm = new FormGroup({});
  forgotPasswordModel: any = {};
  forgotPasswordFields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        placeholder: 'Email',
        required: true,
      },
    },
  ];
  resetPasswordForm = new FormGroup({});
  resetPasswordModel: any = {};
  resetPasswordFields: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [
          { name: 'fieldMatch', options: { errorPath: 'passwordConfirm' } },
        ],
      },
      fieldGroup: [
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            placeholder: 'Password',
            required: true,
            minLength: 6,
          },
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          templateOptions: {
            type: 'password',
            placeholder: 'Confirm Password',
            required: true,
          },
        },
      ],
    },
  ];

  HTTPResponseMessage: [{
    severity: HTTPResponseStatus;
    // summary: string;
    detail: string;
}];
  HTTPResponseStatus = HTTPResponseStatus;
  submittingForgotPassword = false;
  submittingResetPassword = false;
  resetPasswordOTP: string;
  resetPasswordEmail: string;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public app: AppComponent,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getComponentCurrentState();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitForgotPasswordForm(form): void {
    this.submittingForgotPassword = true;
    const userEmail = this.forgotPasswordForm.value;
    this.subscription.add(
      this.authService.forgotPassword(userEmail).subscribe({
        next: (res) => {
          this.submittingForgotPassword = false;
          this.HTTPResponseMessage =[{
            severity: HTTPResponseStatus.SUCCESS,
            // title: 'Success',
            detail: res.message ? res.message : 'Email sent successfully, please check given mail for details to reset your password'
          }];
        },
        error: (err) => {
          this.submittingForgotPassword = false;
          this.HTTPResponseMessage =[{
            severity: HTTPResponseStatus.ERROR,
            // title: 'An error occurred',
            detail: err?.error?.message ? err?.error?.message : 'Please try submitting your email again'
          }];
        },
        complete: () => {
          this.forgotPasswordForm.reset();
        }
      })
    );
  }

  submitResetPasswordForm(form): void {
    this.submittingResetPassword = true;
    const resetDetails = {
      email : this.resetPasswordEmail,
      verificationCode : this.resetPasswordOTP,
      password : this.resetPasswordForm.value.password,
      // authType: 'EMAIL'
      
    };
    console.log(resetDetails.password, "testing reset")
    this.subscription.add(
      this.authService.resetPassword(resetDetails).subscribe({
        next: (res) => {
          this.submittingResetPassword = false;
          this.HTTPResponseMessage = [{
            severity: HTTPResponseStatus.SUCCESS,
            // title: 'Success',
            detail: res.message ? res.message : 'Your password has been reset successfully, you can now proceed to login with with your new password'

          }];
          // this.authService.loginPageStatusMessage = this.HTTPResponseMessage;
          this.router.navigateByUrl('/auth/login');
        },
        error: (err) => {
          this.submittingResetPassword = false;
          this.HTTPResponseMessage = [{
            severity: HTTPResponseStatus.ERROR,
            // title: 'An error occurred',
            detail: err?.error?.message ? err?.error?.message : 'Please try resetting your password again'
          }];
        }
      })
    );
  }

  getComponentCurrentState(): void {
    console.log("testing function")
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe({
        next: (queryParams) => {
          this.resetPasswordEmail = queryParams.email;
          if (this.resetPasswordEmail) {
            this.componentCurrentState = ComponentStates.RESETPASSWORD;
            console.log(this.componentCurrentState)
          } else {
            this.componentCurrentState = ComponentStates.FORGOTPASSWORD;
          }
          // if (this.utilService.doesURLHaveText('resetPassword')) {
          //   this.componentCurrentState = ComponentStates.RESETPASSWORD;
          //   console.log(this.componentCurrentState)

          // } else {
          //   this.componentCurrentState = ComponentStates.FORGOTPASSWORD;
          //   console.log(this.componentCurrentState)

          // }
        }
      })
    );
    console.log(this.componentCurrentState)
  }

}
