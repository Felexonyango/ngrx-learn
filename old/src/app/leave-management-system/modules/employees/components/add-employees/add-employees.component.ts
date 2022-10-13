import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, Route, Router } from '@angular/router'
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core'
import { Subscription } from 'rxjs'
import { IDepartment } from 'src/app/leave-management-system/models/department.model'
import { DashboardsServicesService } from '../../../dashboards/services/dashboards-services.service'
import { LeavesService } from '../../../leaves/services/leaves.service'
import { createEmployeeFormlyFields } from './create-employees.formly'

import { bankInfoFormlyFields } from './bankDetails.formly'
import { EmployeesService } from '../../services/employees.service'
import { IEmployee } from '../../models/employeeModel'

import { AppBreadcrumbService } from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss'],
})
export class AddEmployeesComponent implements OnInit {
  subscription = new Subscription()
  employee: IEmployee
  departments: IDepartment[] = []
  addEmployeeForm = new FormGroup({})
  model: any = {}
  type = ''
  employeeModel: any = {}

  options: FormlyFormOptions = {}
  fields: FormlyFieldConfig[] = []

  bankInfoForm = new FormGroup({})
  bankInfoModel: any
  bankInfoType = ''
  bankInfoOptions: FormlyFormOptions
  bankInfoFields: FormlyFieldConfig[] = []
  isEdit: boolean
  items: MenuItem[];
  activeIndex: number
  file: File

  message: string[] = []
  progressInfos: any[] = []
  employeeArray:any[]=[]

  constructor(
    private employeesService: EmployeesService,
    private activatedRoute: ActivatedRoute,
    private leaveService: LeavesService,
    private breadcrumbService: AppBreadcrumbService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      { label: 'ADD EMPLOYEE', routerLink: '/leave/employees/add' },
    ])
  }

  ngOnInit(): void {
    this.updateOptions()
    this.fields = createEmployeeFormlyFields
    this.bankInfoFields = bankInfoFormlyFields
    this.getParams()
    this.activeIndex = 0;



    this.items = [{
      label: 'Onboarding Information',
      command: () => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Bank Information',
      command: () => {
        this.activeIndex = 1;

      }
    },

    ];


  }
  nextForm() {
    this.activeIndex = (this.activeIndex + 1)
  }
  backForm() {
    this.activeIndex = (this.activeIndex - 1)
  }

  createEmployee() {
    this.employee = {
      ...this.addEmployeeForm.value,
      ...this.bankInfoForm.value,
    }
    // this.employeeArray.push(this.addEmployeeForm.value, this.bankInfoForm.value)
    console.log(this.employeeArray)
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(id)
    const submitUrl = this.isEdit ?
      this.employeesService.updateEmployee(id, this.employee)
      : this.employeesService.createEmployee(this.employee)
    this.subscription.add(submitUrl.subscribe((data) => {
      this.employee = data.result
      console.log(this.employee)

    })
    )
    this.addEmployeeForm.reset()
    this.bankInfoForm.reset()
    this.router.navigate(['/leave/employees/all'])

  }

  updateOptions() {
    this.fields = createEmployeeFormlyFields
    this.fields[1].fieldGroup[1].templateOptions.options =
      this.leaveService.getAllDepartments()
    //  this.fields[0].fieldGroup[0].templateOptions.options=
    // this.payrollservice.getAllEmployeeType()
    console.log(this.fields[1].fieldGroup[1].templateOptions.options)
  }

  selectedFiles(event) {
    this.file = event.files[0]
  }

  getParams() {
    let employeeID = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(employeeID)
    this.getEmployeeDetails(employeeID)

  }
  getEmployeeDetails(ID: string) {

    this.subscription.add(

      this.employeesService.getEmployeeByID(ID).subscribe({

        next: (res) => {
         
          this.bankInfoModel = res.result
          this.model = res.result
        console.log(this.bankInfoModel)
          // this.employee = res.result
          // this.model
          this.employeeModel = { ...this.employee }
          // console.log(x)
          this.isEdit = true
        },
        complete: () => {
          this.uploaduserImage()
        },

      })

    )
  }

  uploaduserImage() {
    this.subscription.add(
      this.employeesService
        .uploadphoto(this.employee._id, this.file)
        .subscribe()
    )
  }


}
