// import { IEmployee } from "./employee.model";

import {IDepartment} from './department.model'
import {ILeaveDays} from './leaveDays.model'
import {IHoliday, ILeaveType} from './leavetype.model'

// export const companyHolidays: IHoliday[] = [
//     {
//         name: "Sibasi Holiday",
//         startDate: "15-02-2030",
//         endDate: "15-02-2030",
//         comment: "Lorem ipsum ",
//     },
//     {
//         name: "Choma  Area",
//         startDate: "15-02-2030",
//         endDate: "15-02-2030",
//         comment: "Lorem ipsum ",
//     },
//     {
//         name: "Sibasi Holiday",
//         startDate: "15-02-2030",
//         endDate: "15-02-2030",
//         comment: "Lorem ipsum ",
//     },
//     {
//         name: "Choma  Area",
//         startDate: "15-02-2030",
//         endDate: "15-02-2030",
//         comment: "Lorem ipsum ",
//     },
// ];

// export const Employees: IEmployee[] = [
//   {
//     _id: '1',
//     firstName: 'Winnie',
//     lastName: 'Mandela',
//     age: 34,
//     gender: 'Female',
//     phoneNumber: '0743970467',
//     emailAddress: 'test@egmail.com',
//     basicSalary: 40000,
//     status: 'in Office',
//     accountNumbers: {
//       kraPin: 'A098YN346',
//       bankAccount: '12345678090',
//       nhhif: 'NY34678',
//       nssf: 'KYU23689',
//     },
//     nextOfKin: {
//       firstName: 'Testing',
//       lastName: 'Name',
//       emailAddress: 'test@gmail.com',
//       phoneNumber: '+254 7467097',
//     },
//     leaveRequests: [
//       {
//         _id: 1,
//         typeOfLeave: 'Casual Leave',
//         modeOfLeave: 'Full time Leave',
//         startDate: '15 June ',
//         endDate: '16 July',
//         leaveDays: 20,
//         comment: 'lorem ipsum',
//         description: 'Quick Recovery',
//         status: 'Pending',
//         appliedBy: '1',
//         reviewdBy: 'admin',
//         reportDate: '16 July',
//       },
//     ],
//     employeeType: 'Fulltime',
//     employeeDepartment: 'Microsoft',
//     contractLevel: 'Internship',
//     contractStartDate: '15-02-2030',
//     contractEndDate: '15-02-2030',
//     benefits: {
//       allowance: [{allowanceName: 'House Allowance', amount: 4000}],
//       insurance: [
//         {
//           insuranceName: 'Car Insurance',
//           amount: 4000,
//         },
//       ],
//     },
//     deductions: {
//       tax: 2000,
//       NSSF: 4000,
//     },
//   },
//   {
//     _id: '3',
//     firstName: 'Chary',
//     lastName: 'Maila',
//     age: 34,
//     status: 'On Leave',
//     gender: 'Male',
//     phoneNumber: '0743970467',
//     emailAddress: 'test@egmail.com',
//     accountNumbers: {
//       kraPin: 'A098YN346',
//       bankAccount: '12345678090',
//       nhhif: 'NY34678',
//       nssf: 'KYU23689',
//     },
//     leaveRequests: [
//       {
//         _id: 1,
//         typeOfLeave: 'Casual Leave',
//         modeOfLeave: 'Full time Leave',
//         startDate: '15 June ',
//         endDate: '16 July',
//         leaveDays: 20,
//         comment: 'lorem ipsum',
//         status: 'Pending',
//         appliedBy: '1',
//         reviewdBy: 'admin',
//         reportDate: '16 July',
//       },
//     ],
//     employeeType: 'Part-time',
//     employeeDepartment: 'Microsoft',
//     contractLevel: 'Associate Trainee',
//     contractStartDate: '12-02-2003',
//     contractEndDate: '15-02-2030',
//     basicSalary: 300000,
//     benefits: {
//       allowance: [{allowanceName: 'House Allowance', amount: 4000}],
//       insurance: [
//         {
//           insuranceName: 'Car Insurance',
//           amount: 4000,
//         },
//       ],
//     },
//     deductions: {
//       tax: 2000,
//       NSSF: 4000,
//     },
//   },
//   {
//     _id: '2',
//     status: 'in Office',
//     firstName: 'Winnie',
//     lastName: 'Mandela',
//     age: 34,
//     gender: 'Female',
//     phoneNumber: '0743970467',
//     emailAddress: 'test@egmail.com',
//     basicSalary: 40000,
//     accountNumbers: {
//       kraPin: 'A098YN346',
//       bankAccount: '12345678090',
//       nhhif: 'NY34678',
//       nssf: 'KYU23689',
//     },
//     leaveRequests: [
//       {
//         _id: 1,
//         typeOfLeave: 'Casual Leave',
//         modeOfLeave: 'Full time Leave',
//         startDate: '15 June ',
//         endDate: '16 July',
//         leaveDays: 20,
//         comment: 'lorem ipsum',
//         status: 'Pending',
//         appliedBy: '1',
//         reviewdBy: 'admin',
//         reportDate: '16 July',
//       },
//     ],
//     employeeType: 'Fulltime',
//     employeeDepartment: 'Microsoft',
//     contractLevel: 'Internship',
//     contractStartDate: '15-02-2030',
//     contractEndDate: '15-02-2030',
//     benefits: {
//       allowance: [{allowanceName: 'House Allowance', amount: 4000}],
//       insurance: [
//         {
//           insuranceName: 'Car Insurance',
//           amount: 4000,
//         },
//       ],
//     },
//     deductions: {
//       tax: 2000,
//       NSSF: 4000,
//     },
//   },
//   {
//     _id: '4',
//     firstName: 'Test',
//     lastName: 'Maila',
//     age: 34,
//     status: 'On Leave',
//     gender: 'Male',
//     phoneNumber: '0743970467',
//     emailAddress: 'test@egmail.com',
//     accountNumbers: {
//       kraPin: 'A098YN346',
//       bankAccount: '12345678090',
//       nhhif: 'NY34678',
//       nssf: 'KYU23689',
//     },
//     leaveRequests: [
//       {
//         _id: 1,
//         typeOfLeave: 'Casual Leave',
//         modeOfLeave: 'Full time Leave',
//         startDate: '15 June ',
//         endDate: '16 July',
//         leaveDays: 20,
//         comment: 'lorem ipsum',
//         status: 'Pending',
//         appliedBy: '1',
//         reviewdBy: 'admin',
//         reportDate: '16 July',
//       },
//     ],
//     employeeType: 'Part-time',
//     employeeDepartment: 'Microsoft',
//     contractLevel: 'Associate Trainee',
//     contractStartDate: '12-02-2003',
//     contractEndDate: '15-02-2030',
//     basicSalary: 300000,
//     benefits: {
//       allowance: [{allowanceName: 'House Allowance', amount: 4000}],
//       insurance: [
//         {
//           insuranceName: 'Car Insurance',
//           amount: 4000,
//         },
//       ],
//     },
//     deductions: {
//       tax: 2000,
//       NSSF: 4000,
//     },
//   },
// ]



// export const Departments: IDepartment[] = [
//     {
//         departmentName: "Software Department",
//         minEmployees: 20,
//         employeesInOffice: 10,
//         employeesOnLeave: 20,
//     },
//     {
//         departmentName: "Microsoft Technologies",
//         minEmployees: 40,
//         employeesInOffice: 10,
//         employeesOnLeave: 20,
//     },
//     {
//         departmentName: "HR",
//         minEmployees: 30,
//         employeesInOffice: 10,
//         employeesOnLeave: 20,
//     },
//     {
//         departmentName: "Catering",
//         minEmployees: 30,
//         employeesInOffice: 10,
//         employeesOnLeave: 20,
//     },
// ];

export const leaveDays: ILeaveDays = {
  maximumCarryOver: 20,
  annualLeaveDays: 31,
  casual: 10,
  sick: 3,
  emergency: 4,
}

// export const leaveType: ILeaveType[] = [{}]


 