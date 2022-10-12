export enum UserRoles {
    USERMANAGER = 'USERMANAGER',
    USER = 'USER',
    SYSADMIN = 'SYSADMIN',
}
export const userRoleArray: string[] = [
    'STOREMANAGER',
    'MEMBERMANAGER',
    'MEMBER',
    'SYSADMIN',
];

export enum AuthItemType {
    EMAIL = 'EMAIL',
    PHONENUMBER = 'PHONENUMBER',
}

export interface IAuthItem {
    value: string;
    authType: AuthItemType;
    isVerified: boolean;
}
export interface IUser {
    _id?: string;
    taxRegNO: string;
    branchName:string;
    bankCode:string;
    swiftCode:string;
    firstName: string;
    lastName: string;
    fullname: string;
    status:string,
    store?: string;
    roles?: UserRoles[];
    additionalProperties?: any;
    profilePictureId?: string;
    profileBgColor: string;
    authItems: IAuthItem[];
    isDarkTheme?: boolean;
    bankAccNumber: number
    bankName: string
    department:{
        _id?:string,
        departmentName?:string

    }
    email: string
    employeeIdNumber: string
    idNumber: number
    kraPin: number
    nextOfKin: string
    phoneNumber: number
    startDate: string
    employeeType: {
        _id?:string
        typeName: string
        workingHours: string
      }


}
export interface IAuthItem {
    value: string;
    authType: AuthItemType;
    isVerified: boolean;
}
