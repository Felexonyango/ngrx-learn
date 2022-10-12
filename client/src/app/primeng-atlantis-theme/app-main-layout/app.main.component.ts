import {Component} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { MenuService } from '../atlantis-utils/app.menu.service';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent {
    overlayMenuActive: boolean;

    staticMenuDesktopInactive = false;

    staticMenuMobileActive: boolean;

    sidebarActive = false;

    sidebarStatic = false;

    menuClick: boolean;

    menuHoverActive = false;

    topbarMenuActive: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    configActive: boolean;

    configClick: boolean;

    rightMenuActive: boolean;

    rightMenuClick: boolean;

    searchActive: boolean;

    searchClick: boolean;

    activeInlineProfile: boolean;

    pinActive: boolean;

    constructor(private menuService: MenuService, private primengConfig: PrimeNGConfig, public app: AppComponent) {}

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        if (this.rightMenuActive && !this.rightMenuClick) {
            this.rightMenuActive = false;
        }

        if (this.searchActive && !this.searchClick) {
            this.searchActive = false;
        }

        if (!this.menuClick) {
            if ((this.isSlim() || this.isHorizontal()) && !this.isMobile()) {
                this.menuService.reset();
                this.menuHoverActive = false;
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.overlayMenuActive = false;
                this.staticMenuMobileActive = false;
            }
        }

        this.configClick = false;
        this.rightMenuClick = false;
        this.searchClick = false;
        this.menuClick = false;
        this.topbarItemClick = false;
    }

    onSidebarClick($event) {
        this.menuClick = true;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.overlayMenuActive) {
            this.overlayMenuActive = false;
        }

        if (this.sidebarActive) {
            this.sidebarStatic = !this.sidebarStatic;
        }

        event.preventDefault();
    }

    onSidebarMouseOver(event) {
        if (this.app.menuMode === 'sidebar' && !this.sidebarStatic) {
            this.sidebarActive = this.isDesktop();
            setTimeout(() => {
                this.pinActive = this.isDesktop();
            }, 200);
        }
    }

    onSidebarMouseLeave($event) {
        if (this.app.menuMode === 'sidebar' && !this.sidebarStatic) {
            setTimeout(() => {
                this.sidebarActive = false;
                this.pinActive = false;
            }, 250);
        }
    }

    onMenuButtonClick(event) {
        this.menuClick = true;

        if (this.isOverlay()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }

        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
        this.primengConfig.ripple = event.checked;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    onRightMenuButtonClick() {
        this.rightMenuClick = true;
        this.rightMenuActive = true;
    }

    onRightMenuClick($event) {
        this.rightMenuClick = true;
    }

    isStatic() {
        return this.app.menuMode === 'static';
    }

    isOverlay() {
        return this.app.menuMode === 'overlay';
    }

    isSlim() {
        return this.app.menuMode === 'slim';
    }

    isHorizontal() {
        return this.app.menuMode === 'horizontal';
    }

    isSidebar() {
        return this.app.menuMode === 'sidebar';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return window.innerWidth <= 991;
    }

}
