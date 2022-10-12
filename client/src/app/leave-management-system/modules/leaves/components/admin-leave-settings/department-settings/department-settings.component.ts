import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'
import {Router} from '@angular/router'
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core'
import {Subscription} from 'rxjs'
import {IDepartment} from 'src/app/leave-management-system/models/department.model'
import {LeavesService} from '../../../services/leaves.service'

@Component({
  selector: 'app-department-settings',
  templateUrl: './department-settings.component.html',
  styleUrls: ['./department-settings.component.scss'],
})
export class DepartmentSettingsComponent implements OnInit, OnDestroy {
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
  constructor(private leaveService: LeavesService, private router: Router) {}

  ngOnInit(): void {
    this.getDepartments()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getDepartments() {
    this.subscription.add(
      this.leaveService.getAllDepartments().subscribe(
        (res) => {
          this.departments = res
        },
        (err) => {}
      )
    )
  }

  departmentDialogue() {
    this.displayDepartment = true
  }

  addDepartment() {
    this.department = this.departmentForm.value
    this.subscription.add(
      this.leaveService.createDepartments(this.department).subscribe(
        (res) => {
          
          this.getDepartments()
          this.displayDepartment = false
          this.departmentForm.reset()
        },
        (err) => {
          this.displayDepartment = true
          this.errorMessage = err.error.message
        }
      )
    )
  }

  deleteDepartment(department_id) {
    this.subscription.add(
      this.leaveService.deleteDepartment(department_id).subscribe(
        (res) => {
          this.getDepartments()
        },
        (err) => {}
      )
    )
  }
  handleSelect(id: string) {
    this.router.navigate([`/leave/request/department-details/${id}`])
  }
  getDepartmentById(ID:string){
    this.subscription.add(this.leaveService.getDepartmentById(ID).subscribe({
      
      next: (res) => {
        this.departmentModel={
          departmentName:res.result.department.departmentName
        }
        this.isEdit=true
        //this.department=res.result

      },
    })

  )}

  updateDepartmentModal(department_Id: string) {
    this.displayDepartment = true
    this.departmentId=department_Id
    this.isEdit = true
    this.getDepartmentById(this.departmentId)
  }


  updateDepartment(){
    let editDepartMent={
      _id:this.departmentId,
    department:{
        departmentName:this.departmentModel.departmentName
    }
    }
      this.subscription.add(
        this.leaveService.updateDepartment(editDepartMent._id, editDepartMent.department).subscribe(
          (res)=>{
            this.getDepartments()
            this.displayDepartment=false
        },(err)=>{
          this.displayDepartment=true
        }
         
        )
      )
  }
}
