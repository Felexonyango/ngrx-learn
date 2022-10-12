import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "bson";
import { Document } from "mongoose";

@Schema()
export class LeaveType extends Document {
    @Prop()
    @ApiProperty()
    leaveType:string;

    @ApiProperty()
    @Prop()
    numberOfDays:number;
} 
export const LeaveTypeSchema = SchemaFactory.createForClass(LeaveType); 


export class LeaveTypeDTO {
    @ApiProperty()
    leaveType:string;

    @ApiProperty()
    numberOfDays:number;
} 