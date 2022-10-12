export interface ITestResponseObject<T> {
    message:string;
    result?:T;
    error?:any;
}

export class TestResponse<T> implements ITestResponseObject<T> {
    constructor(public message:string, public result?:T, public error?:any){}
}