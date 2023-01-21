import { Role } from './role';

export type User = {
  _id?: string;
  firstname: string;
  lastname:string;
  email: string;
  password: string;
  startDate:String
    nextOfKin:String
 idNumber:Number
  kraPin:String
  bankAccountNumber:String
  bankName:String,
  phoneNumber:Number
  employeeIdNumber:String  
  status:Boolean
  taxRegNO:String
  swiftCode:String
  branchName:String  
  bankCode:String
  department?:String
  role: Role[];
  menu?:[string]
 
};
