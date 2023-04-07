import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { IDepartment } from 'src/app/model/department';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/deleteConfirmDialog.component';
import { DepartmentActionTypes } from 'src/app/store/actions/department/department.actions';
import { DepartmentState } from 'src/app/store/reducer/department/departmentReducer';
import { getdepartments } from 'src/app/store/selector/department/department.selector';
@Component({
  selector: 'app-department-setting',
  templateUrl: './department-setting.component.html',
  styleUrls: ['./department-setting.component.scss'],
  providers:[DialogService,MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentSettingComponent implements OnInit {
  departments$: Observable<IDepartment[]>;
  department: IDepartment;
  errorMessage: string;
  subscription = new Subscription();
  displayDepartment: boolean = false;
  isEdit: boolean = false;
  options: FormlyFormOptions = {};
  departmentForm = new FormGroup({});
  departmentModel= {};

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
  departmentId: string = '';

  constructor(
    private store: Store<DepartmentState>,
    private dialogService:DialogService,
    ) {}

  ngOnInit(): void {
    this.getDepartments();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addDepartment() {
    this.department = this.departmentForm.value;
    const department: IDepartment = {
      ...this.departmentForm.value,
    };
    this.store.dispatch(DepartmentActionTypes.createDepartment({ department }));

    this.displayDepartment = false;
    this.isEdit=false
    this.departmentForm.reset();
  }

  getDepartments() {
    this.departments$ = this.store.pipe(select(getdepartments));
    this.store.dispatch(DepartmentActionTypes.LoadDepartments());
  }
  updateDepartment() {
    this.isEdit=true
  }
  departmentDialogue() {
    this.displayDepartment = true;
  }

  handleSelect(id: string) {}
  updateDepartmentModal(id: string) {
    this.displayDepartment = true;
    // this.departmentId=department_Id
    this.isEdit = true;
    // this.getDepartmentById(this.departmentId)
  }
  deleteDepartment(id: string) {
    this.store.dispatch(DepartmentActionTypes.deleteDepartment({ id: id }));
  }
  onViewDepartment(id:string){

  }

  public openDeleteDialog(department: IDepartment): void {
    const ref = this.dialogService.open(DeleteConfirmDialogComponent, {
      width: '30%',
      height: '40%',
      header: 'Delete Confirmation',
    });

    ref.onClose.subscribe((confirm) => {
      if (confirm) {
        this.deleteDepartment(department?._id);
      }
    });
  }
}
