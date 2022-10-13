export interface ILogin {
    //authItemValue: string;
    email: string;
    password: string;
}

export interface IRegister {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    platformName: string;
    platformVersion: string;
}

export enum HTTPResponseStatus {
    SUCCESS = "success",
    ERROR = "error",
}
export enum AuthType {
    EMAIL = "EMAIL",
    PHONENUMBER = "PHONENUMBER",
    USERNAME = "USERNAME",
}
