export interface IEmployee {
  _id?: string
  bankAccNumber: number
  bankName: string
  department: {
    _id?: string
    departmentName?: string
  }
  email: string
  employeeIdNumber: string
  firstName: string
  idNumber: number
  taxRegNO: string
  lastName: string
  nextOfKin: string
  phoneNumber: number
  startDate: string
  status: string
  role?: any[]
  branchName: string
  bankCode: string
  swiftCode: string
  isDarkTheme?: boolean
  authItems: any
  employeeType: {
    _id?: string
    typeName: string
    workingHours: string
  }
}

export interface Image {
  file: any
}

export interface IUserRole {
  _id?: string
  role: string
}

export interface IEmployeeSummary {
  _id?: string
  numOfEmployees: number
  employeesInOffice: number
  employeesOnLeave: number
}

export interface IemployeeData {
  labels: {
    onLeave: number
    usersInoffice: number
  }
  datasets: {
    data: any[]
    backgroundColor: any[]
  }[]
}
