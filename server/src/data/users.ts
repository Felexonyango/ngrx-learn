import bcrypt from "bcryptjs";
import { Role } from "../types";
import { User } from "../types/user";
const Users:User[]=[
  {
    name: "Human Resource manager",
    email: "humanresource@gmail.com",
    startDate: "13/11/2022",
    nextOfKin: "Onyango",
    idNumber: 23455667,
    kraPin: "As234ft789",
    bankAccountNumber: "3333333",
    bankName: "Equity Bank",
    phoneNumber: +258888999233,
    employeeIdNumber: "Da1234",
    status: true,
    taxRegNO: "DFGH123",
    swiftCode: "2E22E23423424",
    branchName: "Teslas",
    bankCode: "23444",
    password: bcrypt.hashSync("humanresource2023", 12), 
    role: Role.Admin
  },
]
export default Users;
