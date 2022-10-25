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
    firstName?: string
    idNumber?: number
    taxRegNO?: string
    lastName?: string
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