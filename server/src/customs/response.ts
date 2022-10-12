export interface ISibasiResponseObject<T> {
    message:string;
    result?:T;
    error?:any;
}

export class TestResponse<T> implements ISibasiResponseObject<T> {
    constructor(public message:string, public result?:T, public error?:any){}
}