import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document, ObjectId } from "mongoose";
import { User } from "src/user/models/user.schema";
import { LeaveType } from "../models/leaveType.schema";

export enum Status {
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    APPROVED = 'APPROVED'
}

export enum LeaveMode {
    FULL = "FULL",
    PARTIAL   = "PARTIAL"
}

@Schema({timestamps:true})
export class Leave extends Document {
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'LeaveType'})
    typeOfLeave: ObjectId;

    @Prop()
    modeOfLeave: LeaveMode;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    appliedBy:ObjectId;

    @Prop()
    comment:string;

    @Prop()
    startDate:string;

    @Prop()
    endDate:string;

    @Prop()
    status:Status;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    reviewedBy:string;

    @Prop()
    leaveDays:number;

    @Prop()
    checked:boolean;

    @Prop()
    reportDate: string;

    @Prop()
    requested:number;

}
export const LeaveSchema = SchemaFactory.createForClass(Leave);


export class LeaveDTO {
    @ApiProperty()
    typeOfLeave: ObjectId;

    @ApiProperty()
    modeOfLeave: LeaveMode;

    @ApiProperty()
    comment:string;

    @ApiProperty()
    startDate:string;

    @ApiProperty()
    endDate:string;

    appliedBy:ObjectId;

    status:Status;
}