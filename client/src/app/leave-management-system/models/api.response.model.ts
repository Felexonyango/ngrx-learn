export interface IApiHTTPResponse<T> {

    message: string;
  
    result: T;
  
    error?: any;
  
  }