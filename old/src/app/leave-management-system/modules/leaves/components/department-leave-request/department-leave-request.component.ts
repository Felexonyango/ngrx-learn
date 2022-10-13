import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {PrimeNGConfig} from 'primeng/api'
import {Subscription} from 'rxjs'
import {ILeaves} from 'src/app/leave-management-system/models/leavehistory.model'
import {AppBreadcrumbService} from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service'
import {LeavesService} from '../../services/leaves.service'

@Component({
  selector: 'app-department-leave-request',
  templateUrl: './department-leave-request.component.html',
  styleUrls: ['./department-leave-request.component.scss'],
})
export class DepartmentLeaveRequestComponent implements OnInit {
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
        label: 'DEPARTMENT LEAVE REQUESTS',
        routerLink: 'department-leaverequest',
      },
    ])
  }

  ngOnInit() {
    this.primengConfig.ripple = true
    this.getALLDepartmentLeaveRequests()
    this.approveleave(this.id)
    this.declineleave(this.id)
  }

  getALLDepartmentLeaveRequests() {
    this.subscription.add(
      this.leaveservice.getDepartmentLeaveRequests().subscribe((data) => {
        console.log(this.Ileaves)
        this.Ileaves = data.result
      })
    )
  }

  approveleave(id: any) {
    this.subscription.add(
      this.leaveservice.approveLeaveRequest(id).subscribe((data) => {
        this.leave = data.result
      })
    )
  }

  declineleave(id: any) {
    this.subscription.add(
      this.leaveservice.declineLeaveRequest(id).subscribe((data) => {
        this.leave = data.result
      })
    )
  }
}
