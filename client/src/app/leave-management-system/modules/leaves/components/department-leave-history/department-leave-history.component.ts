import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {PrimeNGConfig} from 'primeng/api'
import {Subscription} from 'rxjs'
import {ILeaves} from 'src/app/leave-management-system/models/leavehistory.model'
import {AppBreadcrumbService} from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service'
import {LeavesService} from '../../services/leaves.service'

@Component({
  selector: 'app-department-leave-history',
  templateUrl: './department-leave-history.component.html',
  styleUrls: ['./department-leave-history.component.scss'],
})
export class DepartmentLeaveHistoryComponent implements OnInit {
  Ileaves: ILeaves[] = []
  leave: ILeaves
  id: any
  subscription = new Subscription()
  constructor(
    private leaveservice: LeavesService,
    private route: Router,
    private primengConfig: PrimeNGConfig,
    private breadcrumbService: AppBreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      {
        label: 'DEPARTMENT LEAVE HISTORY',
        routerLink: 'department-leave-history',
      },
    ])
  }

  ngOnInit(): void {
    this.getALLDepartmentLeaveHistory()
    this.primengConfig.ripple= true
  }
  getALLDepartmentLeaveHistory() {
    this.subscription.add(
      this.leaveservice.getDepartmentLeaveHistroy().subscribe((data) => {
        console.log(this.Ileaves, 'OG')
        this.Ileaves = data.result
      })
    )
  }
}
