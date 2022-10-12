export interface IUpcomingLeave{
    typeOfLeave:string
    startDate:Date
    status:string

}

export interface Image {
    imageSrc: string;
    name: string;
    title: string;
}
export interface Dates {
    yearsTodate: number;
    leaveBalance: number;
    leaveConsumed: number;
}

export interface Desc {
    description: string;
    note: string;
}

export interface Notes {
    description: string;
    note: string;
}

export interface ILeaveRequestDetails {
    _id: number;
    typeOfLeave: string;
    modeOfLeave: string;
    startDate: string;
    endDate: string;
    leaveDays: number;
    description?: string;
    comment?: string;
    status: string;
    appliedBy: string;
    reviewdBy: string;
    reportDate: string;
}
