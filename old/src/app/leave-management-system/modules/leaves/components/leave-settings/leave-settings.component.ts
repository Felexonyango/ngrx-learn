import {Component, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'
import {FormlyFormOptions, FormlyFieldConfig} from '@ngx-formly/core'
import {MenuItem, MessageService, PrimeNGConfig} from 'primeng/api'
import {Dialog} from 'primeng/dialog'
import {Subscription} from 'rxjs'
import { HTTPResponseStatus } from 'src/app/leave-management-system/models/auth.model'
import {IDepartment} from 'src/app/leave-management-system/models/department.model'
import {ILeaveDays} from 'src/app/leave-management-system/models/leaveDays.model'
import {
  IHoliday,
  ILeaveType,
} from 'src/app/leave-management-system/models/leavetype.model'
import { AppBreadcrumbService } from 'src/app/primeng-atlantis-theme/atlantis-utils/app.breadcrumb.service'
import {LeavesService} from '../../services/leaves.service'

@Component({
  selector: 'app-leave-settings',
  templateUrl: './leave-settings.component.html',
  styleUrls: ['./leave-settings.component.scss'],
})
export class LeaveSettingsComponent implements OnInit {
  subscription = new Subscription()

  items: MenuItem[]
  leave = [{type: 'casual', period: '2 Months'}]
  data: any
  leaveType: ILeaveType
  holidays: IHoliday[] = []
  display: boolean = false
  displayHoliday: boolean = false
  displayDepartment: boolean = false
  departments: IDepartment[] = []
  displayDays: boolean = false
  leaveDays: ILeaveDays[] = []
  holiday: IHoliday
  department: any

  //Leave form
  form = new FormGroup({})
  model: any = {}

  fields: FormlyFieldConfig[] = [
    {
      key: 'leaveType',
      type: 'input',
      templateOptions: {
        label: 'Leave Type Name',
        placeholder: 'Casual Leave',
        required: true,
      },
    },
    {
      key: 'numberOfDays',
      type: 'input',
      templateOptions: {
        label: 'Number of leave days',
        placeholder: '10',
        required: true,
        type: 'number',
        min: 1,
      },
    },
  ]
  // leave days form
  leaveDaysForm = new FormGroup({})
  leaveDaysModel: any = {}
  leaveDaysFields: FormlyFieldConfig[] = [
    {
      key: 'annualLeaveDays',
      type: 'input',
      templateOptions: {
        label: 'Annual Leave',
        placeholder: 'leave days',
        required: true,
      },
    },
    {
      key: 'maximumCarryOver',
      type: 'input',
      templateOptions: {
        label: 'Max Carry Over Days',
        placeholder: 'carry over',
        required: true,
      },
    },
  ]
  // departments form
  departmentForm = new FormGroup({})
  departmentModel: any = {}
  departmentFields: FormlyFieldConfig[] = [
    {
      key: 'departmentName',
      type: 'input',
      templateOptions: {
        label: 'Company Department',
        placeholder: 'department',
        required: true,
      },
    },
    {
      key: 'numOfEmployees',
      type: 'input',
      templateOptions: {
        label: 'Minimum Employees',
        placeholder: 'department',
        required: true,
      },
    },
  ]

  // holiday Form
  holidayForm = new FormGroup({})
  holidayModel: any = {}
  holidayFields: FormlyFieldConfig[] = [
    {
      key: 'nameOfHoliday',
      type: 'input',
      templateOptions: {
        label: 'Company Holiday',
        placeholder: 'Anniversary',
        required: true,
      },
    },
    {
      fieldGroupClassName: 'grid',
      fieldGroup: [
        {
          className: 'md:col-6  col-12',
          key: 'startDate',
          type: 'input',
          templateOptions: {
            label: 'Start Date',
            type: 'date',
            required: true,
            datepickerOptions: {
              min: '2019-09-10',
            },
            expressionProperties: {
              'templateOptions.datepickerOptions.max': 'model.maxDate',
            },
          },
        },
        {
          className: 'md:col-6 col-6',
          key: 'endDate',
          type: 'input',
          templateOptions: {
            label: 'End Date',
            type: 'date',
            placeholder: '15-02-2030',
            required: true,
          },
        },
      ],
    },
    {
      key: 'comment',
      type: 'input',
      templateOptions: {
        label: 'Desription',
        placeholder: 'Happy Anniversary',
        required: true,
      },
    },
  ]

  HTTPResponseMessage: [
    {
        severity: HTTPResponseStatus;
        // summary: string;
        detail: string;
    }
];
HTTPResponseStatus = HTTPResponseStatus;

  constructor(
    private leaveService: LeavesService,
    private breadcrumbService: AppBreadcrumbService
    ) {
      this.breadcrumbService.setItems([
        {label: 'LEAVE SETTING', routerLink: '/leave/request/settings'},
      ])
    }


  ngOnInit(): void {
    this.getDepartments()
    this.getHolidays()
    this.getLeaveTypes()
    this.getAnnualLeaveDays()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  showDialog() {
    this.display = true
  }
  showDialog2() {
    this.displayHoliday = true
  }

  departmentDialogue() {
    this.displayDepartment = true
  }
  leaveDaysDialog() {
    this.displayDays = true
  }
  // getHolidays() {
  //     this.holidays = this.leaveService.getHolidays();
  //     return this.holidays;
  // }

  // getLeaveTypes() {
  //     this.leaveType = this.leaveService.getLeaveTypes();
  //     return this.leaveType;
  // }

  getLeaveTypes() {
    this.subscription.add(
      this.leaveService.getLeaveType().subscribe(
        (res) => {
          this.leaveType = res.result
          console.log(this.leaveType)
        },
        (err) => {}
      )
    )
  }
  createLeaveType() {
    this.leaveType = this.form.value
    this.subscription.add(
      this.leaveService.createLeavetype(this.leaveType).subscribe({
        next: (res) => {
          
          this.HTTPResponseMessage = [
              {
                  severity: HTTPResponseStatus.SUCCESS,
                
                  detail: "You have successfully created a leave type",
              },
          ];
          this.getLeaveTypes()
      },
      })
    )
    this.display = false
    // console.log(this.model, 'added leave type')

  }

  addHoliday() {
    // this.holidays={...this.holidayForm.value}
    this.holiday = this.holidayForm.value
    this.subscription.add(
      this.leaveService.createHolidays(this.holidays).subscribe((res) => {
        this.displayHoliday = false
        console.log(this.holidayModel, 'added hol')
        this.getDepartments()
      })
    )
   
   
  }
  // getDemo(){
  //     this.subscription.add(this.demoService.getDemo().subscribe((res)=>{console.log(res)}));

  //   }
  getDepartments() {
    this.subscription.add(
      this.leaveService.getAllDepartments().subscribe((res) => {
        this.departments = res
        console.log(this.departments)
      })
    )
  }
  getHolidays() {
    this.subscription.add(
      this.leaveService.getHolidays().subscribe((res) => {
        this.holidays = res.result
        console.log(this.holidays)
      })
    )
  }

  //   createEmployee(){
  //     this.employee = {...this.addEmployeeForm.value, ...this.personalInfoForm.value}

  //     this.subscription.add(this.EmployeesService.createEmployee(this.employee).subscribe())
  //     console.log("employee added", this.employee)
  //    }
  addDepartment() {
    this.department = {...this.departmentForm.value}
    this.subscription.add(
      this.leaveService.createDepartments(this.department).subscribe()
    )
    this.displayDepartment = false
    console.log(this.departmentModel, 'department added')
  }

  getAnnualLeaveDays() {
    // this.leaveDays = this.leaveService.getAnnualLeaveDays()
    // getAnnualLeaveDays() {
    //     this.leaveDays = this.leaveService.getAnnualLeaveDays();
    // // }
  }
  createDays() {
    this.displayDays = false
    console.log(this.leaveDaysModel)
  }
}
