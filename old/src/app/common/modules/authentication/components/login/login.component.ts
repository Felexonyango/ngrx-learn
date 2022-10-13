import { AppComponent } from "src/app/app.component";

import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { projectConstants } from "src/app/project-constants/project.constants";
import {
    HTTPResponseStatus,
    ILogin,
} from "src/app/leave-management-system/models/auth.model";
import { AuthService } from "src/app/leave-management-system/services/auth/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
    projectConstants = projectConstants;
    currentYear = new Date().getFullYear();

    subscription = new Subscription();

    HTTPResponseMessage: [
        {
            severity: HTTPResponseStatus;
            // summary: string;
            detail: string;
        }
    ];
    HTTPResponseStatus = HTTPResponseStatus;
    isSubmitting = false;

    constructor(
        private authService: AuthService,

        private router: Router,
        private route: ActivatedRoute,
        public app: AppComponent
    ) {
        if (this.authService.isLoggedIn()) {
            const redirectUrl = this.authService.redirectUrl || "/store";
            this.router.navigateByUrl(redirectUrl);
        }
    }
    loginForm = new FormGroup({});
    model: any = {};
    fields: FormlyFieldConfig[] = [
        {
            key: "email",
            type: "input",
            templateOptions: {
                placeholder: "Email Address",
                required: true,
            },
        },
        {
            key: "password",
            type: "input",
            templateOptions: {
                placeholder: "Password",
                type: "password",
                required: true,
            },
        },
    ];

    ngOnInit(): void {
        // this.getParams();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    submitLoginForm(): void {
        this.isSubmitting = true;
        const userDetails: ILogin = this.loginForm.value;
        console.log(userDetails);
        this.subscription.add(
            this.authService.login(userDetails).subscribe({
                next: (res) => {
                    this.isSubmitting = false;
                    this.HTTPResponseMessage = [
                        {
                            severity: HTTPResponseStatus.SUCCESS,
                            // summary: 'Success',
                            detail: "You have successfully logged in, please wait as we redirect you",
                        },
                    ];
                    console.log(res.result)
                    
                },
                error: (err) => {
                    console.log(err);
                    this.isSubmitting = false;
                    this.HTTPResponseMessage = [
                        {
                            severity: HTTPResponseStatus.ERROR,
                            // summary: `We couldn't sign you in`,
                            detail: err?.error?.message
                                ? err?.error?.message
                                : "There was an error when trying to log you in, please try again",
                        },
                    ];
                },
            })
        );
    }
    decodejwt(){

    }
}
