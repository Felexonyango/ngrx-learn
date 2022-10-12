import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'
import {ActivatedRoute} from '@angular/router'
import {FormlyFieldConfig} from '@ngx-formly/core'
import {Subscription} from 'rxjs'
import {IHoliday} from 'src/app/leave-management-system/models/leavetype.model'
import {LeavesService} from '../../../services/leaves.service'

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
})
export class HolidaysComponent implements OnInit, OnDestroy {
  subscription = new Subscription()
  holidayForm = new FormGroup({})
  holidayModel: any = {}
  isEdit: boolean = false
  holidayFields: FormlyFieldConfig[] = [
    {
      key: 'name',
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
    {
      key: 'recurring',
      type: "checkbox",
      templateOptions: {
        label: 'Reccurring Holiday',
      
      },
    },
  ]
  displayHoliday: boolean = false
  holidays: IHoliday[] = []
  holiday: IHoliday
  errorMessage: string = ''

  constructor(
    private leaveService: LeavesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getHolidays()
  }
  ngOnDestroy(): void {}

  showDialog2() {
    this.holidayForm.reset()
    this.isEdit = false
    this.holidayModel = {}
    this.displayHoliday = true
  }

  getHolidays() {
    this.subscription.add(
      this.leaveService.getHolidays().subscribe((res) => {
        this.holidays = res.result
      })
    )
  }

  addHoliday() {
    this.holiday = this.holidayForm.value
    const submitURL = this.isEdit
      ? this.leaveService.updateHoliday(this.holidayModel._id, this.holiday)
      : this.leaveService.createHolidays(this.holiday)
    this.subscription.add(
      submitURL.subscribe({
        next: (res) => {
          this.holidayForm.reset()
          this.displayHoliday = false
          this.getHolidays()
        },
      })
    )

    // this.subscription.add(
    //   this.leaveService.cretateHolidays(this.holiday).subscribe(
    //     (res) => {
    //       this.displayHoliday = false
    //       this.getHolidays()
    //     },
    //     (err) => {
    //       this.displayHoliday = true
    //       this.errorMessage = err.error.exception.response
    //     }
    //   )
    // )
  }
  deleteHoliday(id: string) {
    this.subscription.add(
      this.leaveService.deleteHoliday(id).subscribe(
        (res) => {
          this.getHolidays()
        },
        (err) => {}
      )
    )
  }
  getHolidayById(ID: string) {
    this.subscription.add(
      this.leaveService.getHolidayById(ID).subscribe({
        next: (res) => {
          this.holidayModel = res.result
        },
      })
    )
  }

  updateHolidayModal(holidayId: string) {
    this.displayHoliday = true
    this.isEdit = true
    this.getHolidayById(holidayId)
  }
}
