import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { createEmployeeFormlyFields } from './create-employees.formly';
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
  employeeModel: any = {};

  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];


  isEdit: boolean;

 
 
  employeesService: any;

  constructor(
    private store: Store<EmployeeState>,
    private route: ActivatedRoute,
    private router: Router,
    
    ) {}

  ngOnInit(): void {
    this.fields = createEmployeeFormlyFields;
   
  
    
  }

  createEmployee() {
 
    this.employee = this.addEmployeeForm.value
 
    const id = this.route.snapshot.paramMap.get('id')
   
// this.store.dispatch(new EmployeeAction.UpdateEmployee(id)):
this.store.dispatch(new EmployeeAction.createEmployee(this.employee))
    
    // const submitUrl = this.isEdit ?
    //   this.employeesService.updateEmployee(id, this.employee)
    //   : this.employeesService.createEmployee(this.employee)
    // this.subscription.add(submitUrl.subscribe((data) => {
    //   this.employee = data.result
    //   console.log(this.employee)
    // })
    // )
    this.addEmployeeForm.reset()
    
    this.router.navigate(['/employees/all-employees'])


  }
  // updatePost(post: IEmployee){
  //   this.store.dispatch(new EmployeeAction.UpdateEmployee(id,post));
  // }

}
