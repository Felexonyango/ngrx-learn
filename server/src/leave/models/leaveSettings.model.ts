import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";


@Schema()
export class LeaveSetting extends Document {
    @Prop()
    @ApiProperty()
    numberOfLeaveDays:number;

    @Prop()
    @ApiProperty()
    carryOverDays:number;
}
export const LeaveSettingSchema = SchemaFactory.createForClass(LeaveSetting);


export class LeaveSettingDTO {
    @ApiProperty()
    numberOfLeaveDays:number;

    @ApiProperty()
    carryOverDays:number;
}