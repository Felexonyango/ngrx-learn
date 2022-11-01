import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { IDepartment } from 'src/app/model/department';
import { DepartmentActionTypes } from 'src/app/store/actions/department.actions';
import { DepartmentState } from 'src/app/store/reducer/departmentReducer';
import {getdepartments} from 'src/app/store/selector/department.selector'
@Component({
  selector: 'app-department-setting',
  templateUrl: './department-setting.component.html',
  styleUrls: ['./department-setting.component.scss']
})
export class DepartmentSettingComponent implements OnInit {

  departments$:Observable<IDepartment[]> 
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

  constructor(
    private store: Store<DepartmentState>
  ) { }   

  ngOnInit(): void {
    this.getDepartments()
    
  }

  addDepartment(){
    this.department = this.departmentForm.value
    const  department: IDepartment = { 
      ...this.departmentForm.value
     };
    this.store.dispatch( DepartmentActionTypes.createDepartment({department }));
    console.log(this.department)
    this.displayDepartment = false
    this.departmentForm.reset();

  }

  getDepartments(){
    this.departments$ = this.store.pipe(select(getdepartments));
    this.store.dispatch( DepartmentActionTypes.LoadDepartments() )
  }
  updateDepartment(){

  }
  departmentDialogue() {
    this.displayDepartment = true
  }

  handleSelect(id:string){

  }
  updateDepartmentModal(id:string){

  }
  deleteDepartment(id:string){
this.store.dispatch(DepartmentActionTypes.deleteDepartment({id:id}))
  }
}
