import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/leave-management-system/services/auth/auth.service';
import { projectConstants } from 'src/app/project-constants/project.constants';
import { AppMainComponent } from '../app-main-layout/app.main.component';

@Component({
    selector: 'app-topbar',
    template: `
    <div class="grid bell">
    <div class="card col-12" >
        <i class=" pi pi-bell flex align-items-end"></i>

    </div>
</div>
`,

    //     <div class="layout-topbar">
    //         <div class="layout-topbar-left">
    //             <a
    //                 href="#"
    //                 class="topbar-menu-button"
    //                 (click)="appMain.onMenuButtonClick($event)"
    //                 *ngIf="appMain.isOverlay() || appMain.isMobile()"
    //             >
    //                 <i class="pi pi-bars"></i>
    //             </a>

    //             <a href="#" class="logo">
    //                 <img
    //                     style="height: 3.5rem;"
    //                     [src]="
    //                         'assets/images/brand/' +
    //                         (app.colorScheme === 'light'
    //                             ? projectConstants?.darkLogo
    //                             : projectConstants?.lightLogo)
    //                     "
    //                 />
    //             </a>
    //         </div>

    //         <app-menu></app-menu>

    //         <div class="layout-topbar-right">
    //             <ul class="layout-topbar-right-items">
    //                 <li
    //                     #profile
    //                     class="profile-item"
    //                     [ngClass]="{
    //                         'active-topmenuitem':
    //                             appMain.activeTopbarItem === profile
    //                     }"
    //                 >
    //                     <a
    //                         href="#"
    //                         (click)="appMain.onTopbarItemClick($event, profile)"
    //                     >
    //                         <img
    //                             src="assets/images/avatars/avatar.png"
    //                             style="border-radius: 22px"
    //                         />
    //                     </a>

    //                     <ul class="fadeInDown">
    //                         <li role="menuitem">
    //                             <a
    //                                 href="#"
    //                                 (click)="
    //                                    appMain.onTopbarSubItemClick($event); appMain.onRightMenuButtonClick()
    //                                 "
    //                             >
    //                                 <i class="pi pi-fw pi-user"></i>
    //                                 <span>Profile</span>
    //                             </a>
    //                         </li>
    //                         <li role="menuitem">
    //                             <a
    //                             [routerLink]="['/store/select']"
    //                                 (click)="
    //                                     appMain.onTopbarSubItemClick($event)
    //                                 "
    //                             >
    //                                 <i class="pi pi-fw pi-clone"></i>
    //                                 <span>My Stores</span>
    //                             </a>
    //                         </li>
    //                         <li role="menuitem">
    //                             <a
    //                                 href="#"
    //                                 (click)="
    //                                     appMain.onTopbarSubItemClick($event);
    //                                     logout()
    //                                 "
    //                             >
    //                                 <i class="pi pi-fw pi-sign-out"></i>
    //                                 <span>Logout</span>
    //                             </a>
    //                         </li>
    //                     </ul>
    //                 </li>
    //                 <!-- <li>
    //                     <a href="#">
    //                         <i class="topbar-icon pi pi-fw pi-bell"></i>
    //                         <span class="topbar-badge">2</span>
    //                         <span class="topbar-item-name">Notifications</span>
    //                     </a>
    //                 </li>
    //                 <li>
    //                     <a href="#">
    //                         <i class="topbar-icon pi pi-fw pi-comment"></i>
    //                         <span class="topbar-badge">5</span>
    //                         <span class="topbar-item-name">Messages</span>
    //                     </a>
    //                 </li> -->
    //             </ul>
    //         </div>
    //     </div>
    // `,
})
export class AppTopbarComponent {
    projectConstants = projectConstants;
    constructor(
        public app: AppComponent,
        public appMain: AppMainComponent,
        private authService: AuthService
    ) {}
    logout() {
        this.authService.logout();
    }
}
