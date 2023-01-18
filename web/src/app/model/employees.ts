export interface IEmployee {
    _id?:string,
    bankAccNumber?: number
    bankName?: string
    department?: {
      _id?: string
      departmentName?: string
    }
    email?: string
    employeeIdNumber?: string
    idNumber?: number
    taxRegNO?: string
    name?: string
    nextOfKin?: string
    phoneNumber?: number
    startDate?: string
    status?: string
    role?: any[]
    branchName?: string
    bankCode?: string
    swiftCode?: string
    isDarkTheme?: boolean
    authItems?: any
    employeeType?: {
      _id?: string
      typeName: string
      workingHours: string
    }
  }

  export interface IEmployeeSummary {
    _id?: string
    numOfEmployees: number
    employeesInOffice: number
    employeesOnLeave: number
  }
  