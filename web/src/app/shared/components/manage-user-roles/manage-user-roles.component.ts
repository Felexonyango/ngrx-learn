
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MessageService } from "primeng/api";
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from "primeng/dynamicdialog";
import { Subscription } from "rxjs";
import { RoleAction } from "src/app/model/userRoles.model";
import { PermissionService } from "src/app/services/permission/permission.service"
import { IPermission } from "src/app/model/permission.model";

@Component({
    selector: "app-manage-user-roles",
    templateUrl: "./manage-user-roles.component.html",
    styleUrls: ["./manage-user-roles.component.scss"],
    providers: [DialogService],
})
export class ManageUserRolesComponent implements OnInit {
    userRolesArray: IPermission[] = [];
    subscriptions = new Subscription();

    @Input() activeModuleRoles: string[] = [];
    @Input() activeModuleDetails: any;
    @Output() passEntry: EventEmitter<{ role: string; action: RoleAction }> =
        new EventEmitter();
    roleAction = RoleAction;
    isLoading = false;

    constructor(
        public messageService: MessageService,
        public dialogService: DialogService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private permissionService: PermissionService
    ) {}

    ngOnInit(): void {
        this.getAllUserRoles();
    }

    checkIfModuleHasRole(role: IPermission): boolean {
        return this.config?.data?.assignedRole?._id === role._id ? true : false;
    }

    updateModuleRoles(role: IPermission): void {
        this.ref.close(role);
    }

    getAllUserRoles(): void {
        this.isLoading = true;
        this.subscriptions.add(
            this.permissionService.getAllPermissions().subscribe({
                next: (res) => {
                    this.userRolesArray = res.result;
                    this.isLoading = false;
                },
            })
        );
    }
}
