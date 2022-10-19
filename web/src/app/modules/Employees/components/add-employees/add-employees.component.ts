import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { createEmployeeFormlyFields } from './create-employees.formly';
import { bankInfoFormlyFields } from './bankDetails.formly';
import { IEmployee } from '../../../../model/employees';
import { IDepartment } from '../../../../model/department';
import { MenuItem } from 'primeng/api';
import { EmployeeState } from 'src/app/store/reducer/employeeReducer';
import { Store } from '@ngrx/store';
import * as EmployeeAction from '../../../../store/actions/employee.action'
@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss'],
})
export class AddEmployeesComponent implements OnInit {
  subscription = new Subscription();
  employee: IEmployee;
  departments: IDepartment[] = [];
  addEmployeeForm = new FormGroup({});
  model: any = {};
  type = '';
  employeeModel: any = {};

  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  bankInfoForm = new FormGroup({});
  bankInfoModel: any;
  bankInfoType = '';
  bankInfoOptions: FormlyFormOptions;
  bankInfoFields: FormlyFieldConfig[] = [];
  isEdit: boolean;
  items: MenuItem[];
  activeIndex: number;
  file: File;

  message: string[] = [];
  progressInfos: any[] = [];
  employeeAr;
  constructor(private store: Store<EmployeeState>) {}

  ngOnInit(): void {
    this.fields = createEmployeeFormlyFields;
    this.bankInfoFields = bankInfoFormlyFields;
    
  }

  createEmployee() {
    // this.employee = {
    //   ...this.addEmployeeForm.value,
    //   ...this.bankInfoForm.value,
    // }
    // // this.employeeArray.push(this.addEmployeeForm.value, this.bankInfoForm.value)
    // console.log(this.employeeArray)
    // const id = this.activatedRoute.snapshot.paramMap.get('id')
    // console.log(id)
    // const submitUrl = this.isEdit ?
    //   this.employeesService.updateEmployee(id, this.employee)
    //   : this.employeesService.createEmployee(this.employee)
    // this.subscription.add(submitUrl.subscribe((data) => {
    //   this.employee = data.result
    //   console.log(this.employee)
    // })
    // )
    // this.addEmployeeForm.reset()
    // this.bankInfoForm.reset()
    // this.router.navigate(['/leave/employees/all'])


  }
}
