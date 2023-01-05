import { String } from "aws-sdk/clients/acm";
import { Schema, model, Document } from "mongoose";

export enum Status {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  APPROVED = "APPROVED",
}
export interface LeaveDocument extends Document {
  type: string;
  comment: string;
  startDate: string;
  endDate: string;
}
const { ObjectId } = Schema.Types;

const leaveSchema = new Schema(
  {

    type: String,
    comment: String,
    startDate: String,
    endDate: String,
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
export const Leave = model<LeaveDocument>("Leave", leaveSchema);
