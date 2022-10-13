import { Component, Input, OnInit } from '@angular/core'
import { PrimeNGConfig } from 'primeng/api'
import { ILeaves } from 'src/app/leave-management-system/models/leavehistory.model'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { HTTPResponseStatus } from 'src/app/leave-management-system/models/auth.model'
import { LeavesService } from '../../services/leaves.service'
import { DashboardsServicesService } from '../../../dashboards/services/dashboards-services.service'
import { AppBreadcrumbService } from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service'
import { IEmployee, Image } from '../../../employees/models/employeeModel'
import { EmployeesService } from '../../../employees/services/employees.service'
import { DomSanitizer } from '@angular/platform-browser';
import { UtilService } from 'src/app/leave-management-system/services/util/util.service'
@Component({
  selector: 'app-leavehistory',
  templateUrl: './leavehistory.component.html',
  styleUrls: ['./leavehistory.component.scss'],
})
export class LeavehistoryComponent implements OnInit {
  Ileaves: ILeaves[] = []
  leave: ILeaves

  employee: IEmployee
  image: Image
  @Input() file: Image
  id: any
  imageToShow: any;
  subscription = new Subscription();
  display: boolean
  initials: string

  HTTPResponseMessage: [
    {
      severity: HTTPResponseStatus

      detail: string
    }
  ]
  HTTPResponseStatus = HTTPResponseStatus

  constructor(
    private leavService: LeavesService,
    private dashboardservice: DashboardsServicesService,
    private employeeService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    private breadcrumbService: AppBreadcrumbService,
    private sanitizer: DomSanitizer,
    private utils:UtilService

  ) {
    this.breadcrumbService.setItems([
      { label: 'LEAVE HISTORY', routerLink: '/leave/request/history' },
    ])
  }

  ngOnInit() {
    this.primengConfig.ripple = true
    this.getLeaveRequestsByUser()
    this.getEmployee()
    this.deleteLeave(this.id)
    this.getLeaveSummary()
     this.getProfilePicture()
  }

  getLeaveDetails(id) {
    this.subscription.add(
      this.leavService.getLeaveRequestDetail(id).subscribe((res) => { })
    )
  }

  getLeaveRequestsByUser() {
    this.subscription.add(
      this.leavService.getLeaveRequestsByUser().subscribe(
        (data) => {
          this.Ileaves = data.result

        },
        (error) => console.log(error)
      )
    )
  }

  handleSelect(id: string) {
    this.router.navigate([`/leave/leaves/details/${id}`])
  }
  updateLeave(id: string) {
    this.router.navigate([`/leave/leaves/apply/${id}`])
  }

  getEmployee() {
    this.subscription.add(
      this.dashboardservice.getEmployee().subscribe(
        (data) => {
          this.employee = data.result
          // this.profilePictureInitials()

        },
        (error) => console.log(error)
      )
    )
  }

  deleteLeave(id: any) {
    this.subscription.add(
      this.leavService.deleteLeaveRequest(id).subscribe({
        next: (res) => {
          this.Ileaves = this.Ileaves.filter((leave) => leave._id !== id)
          console.log(this.Ileaves, 'delete')
          this.display = false
          this.HTTPResponseMessage = [
            {
              severity: HTTPResponseStatus.SUCCESS,

              detail: 'You have  deleted leave  successfully',
            },
          ]
          this.router.navigate(['/leave/leaves/history'])
        },

        error(err) {
          this.HTTPResponseMessage = [
            {
              severity: HTTPResponseStatus.ERROR,

              detail: err?.error?.message
                ? err?.error?.message
                : 'There was an error when deleting this leave, please try again',
            },
          ]
        },
      })
    )
  }
  deleteLeaveDialog() {
    this.display = true;
  }
  cancelDeleteLeaveDialog() {
    this.display = false
  }

  getLeaveSummary() {
    
    this.subscription.add(
      this.leavService.getLeaveSummary().subscribe((data) => {
        this.leave = data.result
        console.log(this.leave ,'dwdwedew')
      })
    )
  }

  getProfilePicture(){
    this.subscription.add(this.leavService.getProfileImage().subscribe({
      next: (res) => {
        this.createImageFromBlob(res);
      }
    }))

  }

    // console.log(typeof this.employee.firstName, "first name")
    // const firstNameArr = this.employee.firstName.split("")
    // const firstNameFirstLetter= this.employee.firstName.split("")[0].toString()
    // const lastNameFirstLetter = this.employee.lastName.split("")[0].toString()
    // this.initials = firstNameFirstLetter.concat(lastNameFirstLetter)
    // console.log(this.initials)

  

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  getSantizeUrl(image) {
    return this.sanitizer.bypassSecurityTrustUrl(image);
  }

}

