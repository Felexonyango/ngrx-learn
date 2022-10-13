import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { userRoleArray, UserRoles } from 'src/app/leave-management-system/models/user.model';
import { RoleAction } from 'src/app/leave-management-system/models/userRoles.model';
import { UserService } from 'src/app/leave-management-system/services/user/user.service';

@Component({
    selector: 'app-manage-user-roles',
    templateUrl: './manage-user-roles.component.html',
    styleUrls: ['./manage-user-roles.component.scss'],
    providers: [DialogService],
})
export class ManageUserRolesComponent implements OnInit {
    userRolesArray = userRoleArray;
    subscriptions = new Subscription();

    @Input() activeModuleRoles: string[] = [];
    @Input() activeModuleDetails: any;
    @Output() passEntry: EventEmitter<{ role: string; action: RoleAction }> =
        new EventEmitter();
    roleAction = RoleAction;
    isLoading = false;

    constructor(
        private userService: UserService,
        public messageService: MessageService,
        public dialogService: DialogService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        // this.userRolesArray = userRoleArray;
        // this.getAllUserRoles();
    }

    checkIfModuleHasRole(role: UserRoles): boolean {
        return this.config.data.includes(role) ? true : false;
    }

    updateModuleRoles(role: UserRoles, action: RoleAction): void {
        const returnRoleAndAction = {
            role,
            action,
        };
        this.ref.close(returnRoleAndAction);
    }

    // getAllUserRoles(): void {
    //     this.isLoading = true;
    //     this.subscriptions.add(
    //         this.userService.getAllHardCodedUserRoles().subscribe({
    //             next: (res) => {
    //                 this.userRolesArray = res.result;
    //                 this.isLoading = false;
    //             },
    //         })
    //     );
    // }
}
