import { String } from "aws-sdk/clients/acm";
import { Schema, model, Document } from "mongoose";

export interface LeaveTypeDocument extends Document {
  leavetype: string;
  numberOfDays: number;
}

const leavetypeSchema = new Schema(
  {
    leavetype: String,
    numberOfDays: Number,
  },
  {
    timestamps: true,
  }
);
export const LeaveType = model<LeaveTypeDocument>("Leavetype", leavetypeSchema);
