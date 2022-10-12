export interface ILeaveType {
  _id?: string
  leaveType?: string,
  numberOfDays:number
}

export interface IHoliday {
  _id?: string
  name?: string
  startDate?: string
  endDate?: string
  comment?: string
}
