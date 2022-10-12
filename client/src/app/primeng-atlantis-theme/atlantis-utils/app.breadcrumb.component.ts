import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppBreadcrumbService } from './app.breadcrumb.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AppMainComponent } from '../app-main-layout/app.main.component';


@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnDestroy, OnInit {

    subscription: Subscription;

    items: MenuItem[];

    home: MenuItem;

    search: string;

    currentStore: {
        organization: any,
        user: any,
        _id: string
    };

    constructor(
        public breadcrumbService: AppBreadcrumbService,
        public appMain: AppMainComponent,
    ) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.getCurrentStore();
    }

    getCurrentStore(): void {
        // this.subscription.add(
        //     this.storeService.getCurrentStore().subscribe({
        //         next: (res) => this.currentStore = res.result
        //     })
        // );
    }
}
