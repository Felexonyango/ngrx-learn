import { String } from "aws-sdk/clients/acm";
import { Schema, model, Document } from "mongoose";

export interface LeaveTypeDocument extends Document {
  leavetype: string;
  numberOfDays:number
}

const leavetypeSchema = new Schema(
  {
    
      leavetype: {
        type :String,
        required: true,
        unique:true

      },
      
    
      numberOfDays:{
        type :Number,
        required:true

      },


    },
    {
      timestamps: true,
    }
  

);
export const LeaveType = model<LeaveTypeDocument>("LeaveType", leavetypeSchema);
