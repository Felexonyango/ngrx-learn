import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription, takeWhile } from 'rxjs';
import { IDepartment } from 'src/app/model/department';
import { IEmployee } from 'src/app/model/employees';
import { State } from 'src/app/store/reducer/employee/employeeReducer';
import { createEmployeeFormlyFields } from '../add-employees/create-employees.formly';
import { getEmployeeById } from 'src/app/store/selector/employee/employee.selector';
import { EmployeeActionTypes } from '../../../../store/actions/employee/employee.action';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeeComponent implements OnInit {
  subscription = new Subscription();
  employee: IEmployee;
  departments: IDepartment[] = [];
  addEmployeeForm = new FormGroup({});
  model = {};
  employeeModel = {};
  subscriptions = new Subscription();
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  isAlive: true;

  constructor(
    private store: Store<State>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fields = createEmployeeFormlyFields;
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.store.select(getEmployeeById).subscribe((data) => {
        this.employee = data;
        this.addEmployeeForm.patchValue;
      });
    }
  }

  onsubmit() {
    this.employee = this.addEmployeeForm.value;
    const employee: IEmployee = {
      ...this.addEmployeeForm.value,
    };

    this.store.dispatch(
      EmployeeActionTypes.updateEmployee({ employee: employee })
    );
  }
}
