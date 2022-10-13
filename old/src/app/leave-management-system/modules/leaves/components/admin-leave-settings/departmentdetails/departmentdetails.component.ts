import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Subscription} from 'rxjs'
import {AppBreadcrumbService} from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service'
import {IDepartment} from 'src/app/leave-management-system/models/department.model'
import {LeavesService} from '../../../services/leaves.service'
import {EmployeesService} from 'src/app/leave-management-system/modules/employees/services/employees.service'
import {IEmployee} from 'src/app/leave-management-system/modules/employees/models/employeeModel'
@Component({
  selector: 'app-departmentdetails',
  templateUrl: './departmentdetails.component.html',
  styleUrls: ['./departmentdetails.component.scss'],
})
export class DepartmentdetailsComponent implements OnInit {
  subscription = new Subscription()
  //  departmentDetails:IDepartment
  departmentDetails: {
    department: IDepartment
    users: any
    head:any

  }
departmentHead: any;
  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private leavService: LeavesService,
    private employeeService: EmployeesService
  ) {
    this.breadcrumbService.setItems([
      {
        label: 'DEPARTMENT DETAILS',
        routerLink: '/leave/request/department-details/:id',
      },
    ])
  }

  ngOnInit(): void {
    this.getParams()
  }

  getParams() {
    let departmentID = this.route.snapshot.paramMap.get('id')
    console.log(departmentID)
    this.getDepartmentById(departmentID)
  }
  getDepartmentById(ID: string) {
   
    this.subscription.add(
      this.leavService.getDepartmentById(ID).subscribe({
        next: (data) => {
          this.departmentDetails = data.result
          this.departmentHead =this.departmentDetails.users.find(x=>x.role.includes('DEPARTMENTHEAD'))
          console.log(this.departmentHead)
          for (
            let index = 0;
            index < this.departmentDetails.users.length;
            index++
          ) {
            const element = this.departmentDetails.users[index]
            if (element.status) {
              element.status = 'In Office'
            } else {
              element.status = 'On Leave'
            }
          }

        
        },
      
      })
    )
  }
  handleSelect(id: string) {
    this.router.navigate([`/leave/employees/details/${id}`])
  }

  makeDepartmentHead(){

  }
}
