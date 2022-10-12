import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { HTTPResponseStatus } from 'src/app/leave-management-system/models/auth.model';
import { AuthService } from 'src/app/leave-management-system/services/auth/auth.service';
import { projectConstants } from 'src/app/project-constants/project.constants';



@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  projectConstants = projectConstants;
  subscription = new Subscription();

  verifyDetails: {
    verificationCode: string;
    value: string;
    authType: string
  } = {
      verificationCode: '',
      value: '',
      authType: 'EMAIL'
    };
  isVerified = false;
  isLoading = false;
  errorMessage: string = '';
  successMessage: string = '';
  countDownSeconds = 5;
  currentYear = new Date().getFullYear();
    HTTPResponseMessage: {
        severity: HTTPResponseStatus;
        detail: string;
    }[];

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public app: AppComponent
  ) { }

  ngOnInit(): void {

    this.getQueryParams();
  }

  getQueryParams() {
    this.subscription.add();
    this.activatedRoute.queryParams.subscribe({
      next: (queryParam) => {
        const OTP = queryParam.otp;
        const email = queryParam.email;
        this.verifyAuthItem(OTP, email);
      },
    });
  }
  verifyAuthItem(OTP, Email) {
    this.verifyDetails = {
      verificationCode: OTP,
      value: Email,
      authType: 'EMAIL'

    };
    this.isLoading = true;
    this.authService.verifyAuthItem(this.verifyDetails).subscribe({
      next: () => {
        this.isLoading = false;
        this.isVerified = true;
        this.successMessage = 'Your email has been verified successfully';

        // this.startRedirectUserCountDown();
      },

      error: (err) => {
        this.isLoading = false;
        this.isVerified = false;
        this.errorMessage =
            'There was an error when trying to verify your details, please try restarting the process again';
        // this.errorMessage =
        // err?.error?.message ? err?.error?.message :
        //     'There was an error when trying to verify your details, please try again';
        }
    });

  }

  goHome(): void {
    const redirectUrl = '/auth';
    this.router.navigateByUrl(redirectUrl);
  }

  startRedirectUserCountDown(): void {
    // Set the date we're counting down to
    const countDownDate = new Date().getTime() + 5000;

    const _this = this;

    // Update the count down every 1 second
    const x = setInterval(function () {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations seconds
      _this.countDownSeconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        _this.goHome();
      }
    }, 1000);
  }

  updateCountDownSeconds(): void {
    this.countDownSeconds--;
  }
}
