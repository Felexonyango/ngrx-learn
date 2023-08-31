import { Role } from "./role";

export type User = {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  startDate:Date
  password: string;
  nextOfKin: String;
  idNumber: Number;
  bankAccountNumber: String;
  bankName: String;
  phoneNumber: Number;
  employeeIdNumber: String;
  status: Boolean;
  department?: String;
  role: Role[];
};
