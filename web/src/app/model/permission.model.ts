export interface IPermission {
    _id?: string;
    roleName: string;
    roleDescription?: string;
    permissions?: string[];
    menuItems?: any[];
}

export interface IAllowedPermissions {
    value: string;
    text: string;
}
