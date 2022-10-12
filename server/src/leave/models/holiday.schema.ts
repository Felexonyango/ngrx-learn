import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document } from "mongoose";
import { User } from "src/user/models/user.schema";

@Schema()
export class Holiday extends Document {

    @Prop({type:mongoose.Schema.Types.String, ref:'User'})
    appliedBy:User;

    @Prop()
    comment:string;

    @Prop()
    startDate:string;

    @Prop()
    endDate:string;

    @Prop()
    leaveDays:number;

    @Prop()
    name:string;

    @Prop()
    recurring:boolean;
}
export const HolidaySchema = SchemaFactory.createForClass(Holiday);

export class HolidayDTO {
    @ApiProperty()
    comment:string;

    @ApiProperty()
    startDate:string;

    @ApiProperty()
    endDate:string;

    @ApiProperty()
    name:string;

    @ApiProperty()
    recurring:boolean;

    appliedBy:User;

    leaveDays:number;
}