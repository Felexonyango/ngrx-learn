import { Status } from "../model/leave";

export type Leave = {
    _id?: string;
    leavetype?:string
    comment?: string;
    startDate?: Date;
    endDate?: Date;
    duration?:number
    status:Status;
    
   
  };
  