export interface HTTPResponse<T> {
  message: string;
  result: T;
  error?: any;
}
