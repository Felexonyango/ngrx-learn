import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {MenuItem, PrimeNGConfig} from 'primeng/api'
import {Subscription} from 'rxjs'
// import {
//   IEmployees,
//   ILeavesummary,
// } from 'src/app/leave-management-system/models/employee.model'
import {
  ILeaves,
  ILeavesummary,
} from 'src/app/leave-management-system/models/leavehistory.model'
import {DashboardsServicesService} from '../../../dashboards/services/dashboards-services.service'
import {LeavesService} from '../../../leaves/services/leaves.service'
import {ILeaveType} from 'src/app/leave-management-system/models/leavetype.model'
import {AppBreadcrumbService} from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service'
import {IEmployee, IUserRole} from '../../models/employeeModel'
import {DomSanitizer} from '@angular/platform-browser'
import {UtilService} from 'src/app/leave-management-system/services/util/util.service'
import {EmployeesService} from '../../services/employees.service'
import {FormGroup} from '@angular/forms'
import {FormlyFieldConfig} from '@ngx-formly/core'
import { IDepartment } from 'src/app/leave-management-system/models/department.model'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  items: MenuItem[]
  subscription = new Subscription()
  employee: IEmployee
  Ileaves: ILeaves[] = []
  department: IDepartment
  leavesummary: ILeavesummary
  leaveTypes: ILeaveType[] = []
  imageToShow: any
  role: IUserRole
  roleForm = new FormGroup({})
  roleModel: any = {}
  initials: string
  departmentDetails: {
    department: IDepartment
    users: any
  }
  head:any
  roleFields: FormlyFieldConfig[] = [
    {
      key: 'role',
      type: 'select',
      templateOptions: {
        label: 'Role Name',
        placeholder: 'USER',
        description: 'User Role',
        required: true,
        options: [
          {value: 'SUPERVISOR', label: ' Supervisor'},
          {value: 'USERADMIN', label: '   User Admin'},
          {value: 'HUMANRESOURCE', label: 'Human Resource'},
          {value: 'DEPARTMENTHEAD', label: 'Department Head'},
        ],
      },
    },
  ]
  displayRole: boolean = false
  isEdit: boolean = false
  errorMessage: string = ''
  makeDepartmentDialog:boolean;
  constructor(
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute,
    private leavService: LeavesService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dashboardService: DashboardsServicesService,
    private utilService: UtilService,

    private employeeService: EmployeesService,
    private breadcrumbService: AppBreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      {label: 'EMPLOYEE DETAILS', routerLink: '/leave/employees/details/:id'},
    ])
  }
  showDialog() {
    this.displayRole = true
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true
    // this.getDepartmentById()
    this.getParams()
  }

  onleaveRequest(id: string) {
    this.router.navigate([`/leave/leaves/details/${id}`])
  }

  getParams() {
    let employeeID = this.route.snapshot.paramMap.get('ID')
    console.log(employeeID)
    this.getEmployeeById(employeeID)
  }
  getEmployeeById(ID: string) {
    this.subscription.add(
      this.dashboardService.getEmployeeId(ID).subscribe((data) => {
        this.employee = data.result
        this.getProfilePicture(this.employee._id)
        this.getLeaveRequest(this.employee._id)
        console.log(this.employee)
        this.getEmployeesummary(this.employee._id)
      })
    )

    // console.log(this.employee[0].appliedBy.role)
    // this.getEmployeesummary(this.employee[0].appliedBy._id)
    // this.addrole(this.employee[0].appliedBy._id)
  }
  test() {
    this.initials = this.utilService.profilePictureInitials(
      this.employee.firstName,
      this.employee.lastName
    )
    console.log(this.initials, 'test')
  }

  getLeaveRequest(employeeId: string) {
    this.subscription.add(
      this.leavService.getleaveRequests(employeeId).subscribe((data) => {
        this.Ileaves = data.result
      })
    )
  }

  getEmployeesummary(employeeId: string) {
    this.subscription.add(
      this.leavService.employeeleavesummary(employeeId).subscribe((data) => {
        this.leavesummary = data.result
      })
    )
  }
  getLeaveTypes() {
    this.subscription.add(
      this.leavService.getAllLeaveTypes().subscribe(
        (res) => {
          this.leaveTypes = res.result
          console.log(this.leaveTypes)
        },
        (err) => {}
      )
    )
  }
  editEmployee() {
    this.router.navigate([`/leave/employees/add`])
  }

  getProfilePicture(employeeId: string) {
    this.subscription.add(
      this.leavService.getProfileById(employeeId).subscribe({
        next: (res) => {
          this.createImageFromBlob(res)
        },
      })
    )
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader()
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result
      },
      false
    )

    if (image) {
      reader.readAsDataURL(image)
    }
  }
  getSantizeUrl(image) {
    return this.sanitizer.bypassSecurityTrustUrl(image)
  }

  addRole() {
    let userRole = {
      role: this.roleModel.role,
      _id: this.route.snapshot.paramMap.get('ID'),
    }

    this.subscription.add(
      this.employeeService.assignUserRole(userRole).subscribe(
        (res) => {
          this.displayRole = false
          this.getEmployeeById(userRole._id)
        },
        (err) => {
          this.displayRole = false
          this.errorMessage = err.error.exception.response
        }
      )
    )
  }

  updateRole() {
    let userRole = {
      role: this.roleModel.role,
      _id: this.route.snapshot.paramMap.get('ID'),
    }

    this.subscription.add(
      this.employeeService.unAssignUserRole(userRole).subscribe(
        (res) => {
          this.displayRole = false
          this.getEmployeeById(userRole._id)
        },
        (err) => {
          this.displayRole = false
          this.errorMessage = err.error.exception.response
        }
      )
    )
  }

  // getDepartmentById(ID: string) {
  //   this.subscription.add(
  //     this.leavService.getDepartmentById(ID).subscribe({
  //       next: (data) => {
  //         this.departmentDetails = data.result
  //         // this.departmentHead =this.departmentDetails.users.find(x=>x.role.includes('DEPARTMENTHEAD'))
  //         console.log(this.departmentDetails, "test")
  //         for (
  //           let index = 0;
  //           index < this.departmentDetails.users.length;
  //           index++
  //         ) {
  //           const element = this.departmentDetails.users[index]
  //           if (element.status) {
  //             element.status = 'In Office'
  //           } else {
  //             element.status = 'On Leave'
  //           }
  //         }

        
  //       },
      
  //     })
  //   )
  // }

  makeRole(){
    this.head={"head":[this.employee._id]
}
this.subscription.add(this.leavService.MakeRole(this.employee.department._id,this.head).subscribe((res)=>{

  console.log(this.employee ,"is dept head")
}))
this.makeDepartmentDialog = false
this.displayRole = false
}
makeDepartmentHeadDialog(){
  this.makeDepartmentDialog = true
}

cancelDepartmentDialog(){
  this.makeDepartmentDialog = false
}
}
