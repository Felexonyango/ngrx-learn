import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription, takeWhile } from 'rxjs';
import { IDepartment } from 'src/app/model/department';
import { IEmployee } from 'src/app/model/employees';
import { State } from 'src/app/store/reducer/employeeReducer';
import { createEmployeeFormlyFields } from '../add-employees/create-employees.formly';
import { getEmployeeById } from 'src/app/store/selector/employee.selector';
import {EmployeeActionTypes} from '../../../../store/actions/employee.action'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {


  subscription = new Subscription();
  employee: IEmployee;
  departments: IDepartment[] = [];
  addEmployeeForm = new FormGroup({});
  model: any = {};
  employeeModel: any = {};
  subscriptions = new Subscription();
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  isAlive:true

  constructor(
    private store: Store<State>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fields = createEmployeeFormlyFields;
    this.getEmployeeById()
 
  }
 

  getEmployeeById(){
    this.store.select(getEmployeeById).pipe(
      takeWhile(()=>this.isAlive))
      .subscribe(data=>{
        this.employee=data
        this.employeeModel=data
      })
    
  }

  onsubmit(){
    

    this.employee=this.addEmployeeForm.value
    const employee:IEmployee={...this.addEmployeeForm.value}
    
    const formData = this.addEmployeeForm.value;
    const newFormData = { ...this.employee };
    
    Object.keys(formData).map(key => {
      if (newFormData[key] !== formData[key]) {
        newFormData[key] = formData[key];
      }
    });
    this.store.dispatch(EmployeeActionTypes.updateEmployee({employee: employee}))
  }



}