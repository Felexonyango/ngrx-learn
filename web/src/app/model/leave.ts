export interface ILeaveType {
    _id?: string
    leaveType?: string,
    numberOfDays?:number
  }
  export interface IHoliday {
    _id?: string
    name?: string
    startDate?: string
    endDate?: string
    comment?: string
  }

  export interface ILeaves {
    _id?: string
    typeOfLeave: {
      leaveType: string
      id: string
    }
    comment: string
    startDate: Date
    endDate: Date
    status: Status
    checked: false
    reportDate: Date
    requested: number
    appliedBy: {
      _id?:string
      firstName: string
      lastName: string
      department: string
      status: boolean
    }
    leavesConsumed: number
    leaveBalance: number
    yearsToDate: number
    carryOverDays: number
  }
  export enum Status {
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    APPROVED = 'APPROVED',
  }

  export interface INote {
    _id: string
    note: string
  }

  export interface ILeavesummary {
    leavesConsumed: number
    leaveBalance: number
    yearsToDate: number
    carryOverDays: number
   
  }
  