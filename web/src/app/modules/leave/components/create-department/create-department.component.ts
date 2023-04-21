import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { IDepartment } from 'src/app/model/department';
import { LeaveTypeService } from 'src/app/services/leave/leave-type.service';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { UtilService } from 'src/app/services/util/util.service';
import { DepartmentActionTypes } from 'src/app/store/actions/department/department.actions';
import { DepartmentState } from 'src/app/store/reducer/department/departmentReducer';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit {
  department: IDepartment;
  errorMessage: string;
  subscription = new Subscription();
  isEdit: boolean = false;
  options: FormlyFormOptions = {};
  departmentForm = new FormGroup({
  });
  departmentModel = {};
  departmentId:string
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
        label: 'Enter number of   employees ',
        placeholder: 'Enter the number of employees',
        required: true,
      },
    },
  ];

  constructor(
    private store: Store<DepartmentState>,
    private activatedRoute: ActivatedRoute,
    private departmentService: LeaveTypeService,
    public utilService:UtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFromParam()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  CreateOrUpdateDepartment() {
    const department: IDepartment = {
      ...this.departmentModel
    };
    const update: Update<IDepartment> = {
      id:this.departmentId,
      changes: department
    };
    

    this.isEdit? this.store.dispatch(DepartmentActionTypes.updateDepartment({update})):
    this.store.dispatch(DepartmentActionTypes.createDepartment({ department }));
    this.departmentForm.reset();
    this.router.navigateByUrl('/leave/leave-setting')
   
  }


  getFromParam(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (param) => {
           const departmentId = param['departmentId']
          this.getDepartmentById(departmentId);
          this.departmentId=departmentId
         
        },
      })
    );
  }
  getDepartmentById(departmentId: string) {
    this.subscription.add(
      this.departmentService.getDepartment(departmentId).subscribe({
        next: (res) => {
          this.department = res.result;
          this.departmentModel=res.result
        console.log(res.result)
          this.isEdit=true; 
        },
      })
    );
  }

}
