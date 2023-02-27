import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { createEmployeeFormlyFields } from './create-employees.formly';
import { IEmployee } from '../../../../model/employees';
import { IDepartment } from '../../../../model/department';
import { State } from 'src/app/store/reducer/employee/employeeReducer';
import { Store } from '@ngrx/store';
import { EmployeeActionTypes } from '../../../../store/actions/employee/employee.action';
import { LeaveTypeService } from 'src/app/services/leave/leave-type.service';
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
  subscriptions = new Subscription();
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  isEdit: boolean;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private leaveService: LeaveTypeService
  ) {}

  ngOnInit(): void {
    this.fields = createEmployeeFormlyFields;

    this.updateOptions();
    this.getDepartments();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createEmployee() {
    this.employee = this.addEmployeeForm.value;
    const employee: IEmployee = { ...this.addEmployeeForm.value };
  
    this.store.dispatch(EmployeeActionTypes.createEmployee({ employee }));
    this.router.navigateByUrl('/employees/all-employees');
    this.addEmployeeForm.reset();
  }
  updateOptions() {
    this.fields = createEmployeeFormlyFields;
    this.fields[1].fieldGroup[1].props.options =
      this.leaveService.getAllDepartments();
  }

  getDepartments() {
    this.subscription.add(
      this.leaveService.getAllDepartments().subscribe({
        next: (res) => {},
      })
    );
  }
}
