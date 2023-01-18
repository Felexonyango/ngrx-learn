import { String } from "aws-sdk/clients/acm";
import { Schema, model, Document } from "mongoose";

export interface LeaveTypeDocument extends Document {
  leavetype: string;
}

const leavetypeSchema = new Schema(
  {
    leavetype: String,
  },
  {
    timestamps: true,
  }
);
export const LeaveType = model<LeaveTypeDocument>("LeaveType", leavetypeSchema);
