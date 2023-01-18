export interface IResponseObject<T> {
  result?: T;
  message: string;
  error?: any;
}

export class HttpResponse<T> implements IResponseObject<T> {
  constructor(public message: string, public result?: T, public error?: any) {}
}
