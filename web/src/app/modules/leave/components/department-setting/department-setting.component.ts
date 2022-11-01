import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { IDepartment } from 'src/app/model/department';

@Component({
  selector: 'app-department-setting',
  templateUrl: './department-setting.component.html',
  styleUrls: ['./department-setting.component.scss']
})
export class DepartmentSettingComponent implements OnInit {

  departments: IDepartment[] = []
  department: IDepartment
  errorMessage: string
  subscription: Subscription = new Subscription()
  displayDepartment: boolean = false
  isEdit: boolean = false
  options: FormlyFormOptions = {};
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

  ]
  departmentId:string=""

  constructor() { }

  ngOnInit(): void {
    
  }

}
