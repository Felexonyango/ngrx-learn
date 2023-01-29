export interface ILeaveType {
    _id?: string
    leavetype?: string,
    numberOfDays?:number
  }
  export interface IHoliday {
    _id?: string
    name?: string
    startDate?: Date
    duration?:number
    endDate?: Date
    comment?: string
  }

  export interface ILeaves {
    _id?: string
    leavetype: {
      leavetype: string
      _id: string
    }
    comment: string
    startDate: Date
    endDate: Date
    status: Status
    user: {
      _id?:string
      firstname: string
      lastname: string
    }
    menuItems?:any
  
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
  