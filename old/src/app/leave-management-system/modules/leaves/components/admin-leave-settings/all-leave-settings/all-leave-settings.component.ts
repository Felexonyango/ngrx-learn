import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'


import {AppBreadcrumbService} from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service'

@Component({
  selector: 'app-all-leave-settings',
  templateUrl: './all-leave-settings.component.html',
  styleUrls: ['./all-leave-settings.component.scss'],
})
export class AllLeaveSettingsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription()

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    
  ) {
    this.breadcrumbService.setItems([
      {label: 'LEAVE SETTINGS', routerLink: '/leave/request/settings'},
    ])
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  
}
