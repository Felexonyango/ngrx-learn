
import { Schema, model, Document } from "mongoose";
const { ObjectId } = Schema.Types;
export enum Status {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  APPROVED = "APPROVED",
}
export interface LeaveDocument extends Document {
  leavetype:string;
  comment: string;
  startDate: Date;
  endDate: Date;
  

}


const leaveSchema = new Schema(
  {
    leavetype:String,
    comment: String,
    startDate: Date,
    endDate: Date,
    duration:Number,
    user: {
      type: ObjectId,
      ref: "User",
    },
    // leavetypes: {
    //   type: ObjectId,
    //   ref: "LeaveType",
    // },
  },

  {
    timestamps: true,
  }
);
export const Leave = model<LeaveDocument>("Leave", leaveSchema);
