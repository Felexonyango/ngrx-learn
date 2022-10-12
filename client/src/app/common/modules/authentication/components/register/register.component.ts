import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { projectConstants } from "src/app/project-constants/project.constants";
import { AppComponent } from "src/app/app.component";
import { HTTPResponseStatus, IRegister } from "src/app/leave-management-system/models/auth.model";
import { AuthService } from "src/app/leave-management-system/services/auth/auth.service";
import { UtilService } from "src/app/leave-management-system/services/util/util.service";

export enum userMessageType {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}
@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
    projectConstants = projectConstants;
    currentYear = new Date().getFullYear();
    platformVersion: string;
    platformName: string;

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

    loginOrGenerateOtp: Boolean;

    
    errorMessage = "";
    userDetails: {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
    };

    registerForm = new FormGroup({});
    model: any = {};
    fields: FormlyFieldConfig[] = [
        {
            key: "firstname",
            type: "input",
            templateOptions: {
                placeholder: "First Name",
                required: true,
            },
        },
        {
            key: "lastname",
            type: "input",
            templateOptions: {
                placeholder: "Last Name",
                required: true,
            },
        },
        {
            key: "email",
            type: "input",
            templateOptions: {
                placeholder: "Email",
                type: "email",
                required: true,
            },
        },

        {
            validators: {
                validation: [
                    {
                        name: "fieldMatch",
                        options: { errorPath: "passwordConfirm" },
                    },
                ],
            },
            fieldGroup: [
                {
                    key: "password",
                    type: "input",
                    templateOptions: {
                        type: "password",
                        placeholder: "Password",
                        required: true,
                        minLength: 6,
                    },
                },
                {
                    key: "passwordConfirm",
                    type: "input",
                    templateOptions: {
                        type: "password",
                        placeholder: "Confirm Password",
                        required: true,
                    },
                },
            ],
        },
        {
            key: "acceptedTermsAndConditions",
            type: "checkbox",
            className: "text-xs",
            templateOptions: {
                required: true,
                label: "I agree to the Terms and Conditions and the Privacy Policy",
            },
        },
    ];
    constructor(
        private authService: AuthService,
        private location: Location,
        private route: ActivatedRoute,
        public app: AppComponent,
        private utilService: UtilService
    ) {}

    ngOnInit() {
        // this.getParams();
        this.platformVersion = this.utilService.detectBrowserVersion();
        this.platformName = this.utilService.detectBrowserName();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    submitRegisterForm(form): void {
        this.isSubmitting = true;
        const userDetails: IRegister = {
            ...form.value,
            platformName: this.platformName,
            platformVersion: this.platformVersion
        };
        this.subscription.add(
            this.authService.register(userDetails).subscribe({
                next: (res) => {
                    this.isSubmitting = false;
                    this.HTTPResponseMessage = [
                        {
                            severity: HTTPResponseStatus.SUCCESS,
                            // summary: 'Success',
                            detail: "You have been registered successfully, please click link sent to the email you provided to verify it's your email",
                        },
                    ];
                    this.registerForm.reset();
                },
                error: (err) => {
                    this.isSubmitting = false;
                    this.HTTPResponseMessage = [
                        {
                            severity: HTTPResponseStatus.ERROR,
                            // summary: `We couldn't sign you in`,
                            detail: err?.error?.message
                                ? err?.error?.message
                                : "There was an error when trying to sign you up, please try again",
                        },
                    ];
                },
            })
        );
    }

    back(): void {
        this.location.back();
    }

    getParams() {
        let email: string;

        this.route.params.subscribe((param) => {
            email = param.email;
            if (email) {
                const redirectUrl = `/auth/pending-invites/${email}`;
                this.authService.redirectUrl = redirectUrl;
                this.model = {
                    email: email,
                };
            } else {
                const redirectUrl = `/store/select`;
                this.authService.redirectUrl = redirectUrl;
            }
        });
    }
}
