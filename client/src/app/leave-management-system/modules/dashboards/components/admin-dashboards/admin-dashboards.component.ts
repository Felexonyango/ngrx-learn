import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {Chart} from 'chart.js'


import {ILeaves} from 'src/app/leave-management-system/models/leavehistory.model'
import {Subscription} from 'rxjs'
import {LeavesService} from '../../../leaves/services/leaves.service'
import {AppBreadcrumbService} from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service'
import {DashboardsServicesService} from '../../services/dashboards-services.service'
import {
  IemployeeData,
  IEmployeeSummary,
} from '../../../employees/models/employeeModel'
@Component({
  selector: 'app-admin-dashboards',
  templateUrl: './admin-dashboards.component.html',
  styleUrls: ['./admin-dashboards.component.scss'],
})
export class AdminDashboardsComponent implements OnInit {
  data: any
  IupcomingLeaves: ILeaves[] = []
  IendingLeaves: ILeaves[] = []
  ImandatoryLeaves: ILeaves[] = []
  IemployeeInfo: IemployeeData
  subscription = new Subscription()

  constructor(
    private route: Router,
    private leaveservice: LeavesService,
    private breadcrumbService: AppBreadcrumbService,
    private dashboardservice: DashboardsServicesService
  ) {
    this.breadcrumbService.setItems([
      {label: 'DASHBOARD', routerLink: '/leave/dashboard/admin'},
    ])
  }

  Ileaves: ILeaves[] = []
  isLoading: boolean = false

  ngOnInit(): void {
   
    this.getUpcomingLeaves()
    this.getMandatoryLeaves()
    this.getEmployeeSummary()
    this.getAllLeaveRequests()

  }

  getEmployeeSummary() {
    this.subscription.add(
      this.dashboardservice.getEmployeeInfo().subscribe((data) => {
        this.IemployeeInfo = data.result
        const employeeSummarydata = this.IemployeeInfo
        employeeSummarydata.datasets = [
          {
            data: this.IemployeeInfo.datasets[0].data,
            backgroundColor: ['#F80D38', '#0099FB'],
          },
        ]
        this.IemployeeInfo = {...employeeSummarydata}

        console.log(this.IemployeeInfo)
      })
    )
  }

  handleSelect(id) {
    this.route.navigate([`/leave/request/admin/leavedetails/${id}`])
  }

  getUpcomingLeaves() {
    this.subscription.add(
      this.leaveservice.AdminApprovedLeaveRequest().subscribe(
        (data) => {
          this.IupcomingLeaves = data.result
          console.log(data.result)
        },
        (error) => console.log(error)
      )
    )
  }
  getEndingLeaves() {
    this.subscription.add(
      this.leaveservice.EndingLeaveRequest().subscribe(
        (data) => {
          this.IendingLeaves = data.result
        },
        (error) => console.error(error)
      )
    )
  }

  getMandatoryLeaves() {
    this.subscription.add(
      this.leaveservice.MandatoryLeaveRequest().subscribe((data) => {
        this.ImandatoryLeaves = data.result
      })
    )
  }


  addNew() {
    this.isLoading = true
    this.route.navigate(['payroll/all/add'])
  }


  viewPayroll(payroll_id) {
    this.route.navigate([`payroll/all/${payroll_id}/details`])
  }
  getAllLeaveRequests() {

    this.subscription.add(this.leaveservice.getAllNewLeaveRequest().subscribe((data) => {
      this.Ileaves = data.result;
  }));
  
  }
}
