import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { IDepartment } from 'src/app/model/department';
import { UtilService } from 'src/app/services/util/util.service';
import { DeleteConfirmDialogComponent } from 'src/app/shared/components/delete-confirm-dialog/deleteConfirmDialog.component';
import { DepartmentActionTypes } from 'src/app/store/actions/department/department.actions';
import { DepartmentState } from 'src/app/store/reducer/department/departmentReducer';
import {
  getdepartments,
  selectDepartmentById,
} from 'src/app/store/selector/department/department.selector';
@Component({
  selector: 'app-department-setting',
  templateUrl: './department-setting.component.html',
  styleUrls: ['./department-setting.component.scss'],
  providers: [DialogService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentSettingComponent implements OnInit {
  departments$: Observable<IDepartment[]>;
  department: IDepartment[] = [];
  subscription = new Subscription();

  tableColumns: {
    fieldName: string;
    displayName: string;
  }[] = [
    {
      fieldName: 'Department',
      displayName: 'Department',
    },
    {
      fieldName: 'Number of Employees',
      displayName: 'Number of Employees',
    },
   
    
  ];

  constructor(
    private store: Store<DepartmentState>,
    private dialogService: DialogService,
    private router: Router,
    public utiliservice: UtilService
  ) {}

  ngOnInit(): void {
    this.getDepartments();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDepartments() {
    this.departments$ = this.store.pipe(select(getdepartments));
    this.store.dispatch(DepartmentActionTypes.LoadDepartments());
  }

  handleSelect(id: string) {}

  deleteDepartment(id: string) {
    this.store.dispatch(DepartmentActionTypes.deleteDepartment({ id: id }));
  }
  onViewDepartment(id: string) {}

  edit(id: string) {
    this.router.navigate([`/leave/edit-department/${id}`]);
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
  clear($event) {}

  exportData() {
    this.utiliservice.exportAsExcelFile(this.department, 'department');
  }
}
