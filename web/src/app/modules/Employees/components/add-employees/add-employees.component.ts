import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { EmployeeService } from 'src/app/services/employee/employees.service';
import { Update } from '@ngrx/entity';
import { UtilService } from 'src/app/services/util/util.service';
@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployeesComponent implements OnInit {
  subscription = new Subscription();
  employee: IEmployee;
  departments: IDepartment[] = [];
  addEmployeeForm = new FormGroup({});
  employeeModel= {};
  subscriptions = new Subscription();
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  employeeId: string; 
  isEdit: boolean;

  constructor(
    private store: Store<State>,
    private router: Router,
    private leaveService: LeaveTypeService,
    private activatedRoute:ActivatedRoute,
    private employeeService: EmployeeService,
    public utilService:UtilService
  ) {}

  ngOnInit(): void {
    this.fields = createEmployeeFormlyFields;

    this.updateOptions();
    this.getDepartments();
    this.getEmployeeFromParam()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  createOrUpdateEmployee() {
    this.employee = this.addEmployeeForm.value;
    const employee: IEmployee = { 
      ...this.addEmployeeForm.value,
    
    };
    const update: Update<IEmployee> = {
      id: this.employeeId, 
      changes: employee
    };
    this.isEdit
      ? this.store.dispatch(EmployeeActionTypes.updateEmployee({ update }))
      : this.store.dispatch(EmployeeActionTypes.createEmployee({ employee }));
    this.router.navigateByUrl('/app/employees/all-employees');
    this.addEmployeeForm.reset();
  }
  updateOptions() {
    this.fields = createEmployeeFormlyFields;
    console.log(this.fields)
    this.fields[0].fieldGroup[4].props.options =
      this.leaveService.getAllDepartments();
  }

  getDepartments() {
    this.subscription.add(
      this.leaveService.getAllDepartments().subscribe({
        next: (res) => {
          
        },
      })
    );
  } 
  getEmployeeFromParam(): void {
    
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (param) => {
           this.employeeId = param['employeeId'];
          this.getEmployeeById(this.employeeId);
         
        },
      })
    );
  }
  getEmployeeById(employeeId: string) {
    this.subscription.add(
      this.employeeService.getEmployeeByID(employeeId).subscribe({
        next: (res) => {
          this.employee = res.result;
          console.log(this.employee);
          this.employee._id = employeeId; 
          // Set the employee ID from the parameter
          console.log(this.employee._id)
          this.employeeModel = res.result;
          this.isEdit=true;
        },
      })
    );
  }
  
}
