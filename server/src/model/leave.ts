
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
  status:Status;

}


const leaveSchema = new Schema(
  {
    leavetype:String,
    comment: String,
    startDate: String,
    endDate: String,
    duration:Number,
    status:String,
    user: {
      type: ObjectId,
      ref: "User",
    },
 
  },

  {
    timestamps: true,
  }
);
export const Leave = model<LeaveDocument>("Leave", leaveSchema);
