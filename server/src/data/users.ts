import bcrypt from "bcryptjs";
import { Role } from "../types";
import { User } from "../types/user";
const Users:User[]=[
  {
    firstname: "John",
    lastname:'Doe',
    email: "humanresource@gmail.com",
    nextOfKin: "Onyango",
    idNumber: 23455667,
   startDate:new Date(),
    bankAccountNumber: "3333333",
    bankName: "Equity Bank",
    phoneNumber: +258888999233,
    employeeIdNumber: "Da1234",
    status: true,
    department:'63bf70dc9c486634908abcfe',
    password: bcrypt.hashSync("humanresource2023", 12), 
    role: [Role.Admin]
  }
  
]
export default Users;
