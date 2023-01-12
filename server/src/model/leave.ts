import { String } from "aws-sdk/clients/acm";
import { Schema, model, Document } from "mongoose";

export enum Status {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  APPROVED = "APPROVED",
}
export interface LeaveDocument extends Document {
  comment: string;
  startDate: string;
  endDate: string;
}
const { ObjectId } = Schema.Types;

const leaveSchema = new Schema(
  {
    comment: String,
    startDate: String,
    endDate: String,
    user: {
      type: ObjectId,
      ref: "User",
    },
    leavetype: {
      type: ObjectId,
      ref: "LeaveType",
    },
  },

  {
    timestamps: true,
  }
);
export const Leave = model<LeaveDocument>("Leave", leaveSchema);
