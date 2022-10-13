import {Component, OnDestroy, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppMainComponent } from '../app-main-layout/app.main.component';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/leave-management-system/services/auth/auth.service';
import { UserService } from 'src/app/leave-management-system/services/user/user.service';
@Component({
    selector: 'app-inlinemenu',
    templateUrl: './app.inlinemenu.component.html',
    animations: [
        trigger('inline', [
            state('hidden', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*',
            })),
            state('hiddenAnimated', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppInlineMenuComponent implements OnInit, OnDestroy {

    subscriptions = new Subscription();
    userProfile: any;

    constructor(
        public appMain: AppMainComponent,
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.getUserProfile();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getUserProfile(): void {
        this.subscriptions.add(
            this.userService.getUserProfile().subscribe({
                next: (res) => {
                    this.userProfile = res.result;
                }
            })
        );
    }

    logout() {
        this.authService.logout();
      }
}
