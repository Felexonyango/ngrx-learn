import { ILeaves } from "./leave"

export interface IEmployee {
    _id?:string,
    firstname?:string
    lastname?:string
    department?: {
      _id?: string
      departmentName?: string
    }
    email?: string
    employeeIdNumber?: string
    idNumber?: number
    taxRegNO?: string
    gender?:string
    name?: string
    nextOfKin?: string
    phoneNumber?: number
    startDate?: Date
    status?: string
    role?: any[]
    leave?:ILeaves[]
 
  }

  export interface IAdminSummary {
    _id?: string
    totalLeaves: number
    totalUser: number
    totaldepartments: number
  }
  export interface IEmployeeSummary {
  
    _id?: string
    appliedLeaves: number
    pendingLeaves: number
    approvedleaves: number
  }
 
 