/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document, ObjectId} from "mongoose";
import { type } from "os";

@Schema({
    timestamps:true
})
export class EmployeeType extends Document{

    @Prop()
    typeName:string;

    @Prop()
    workingHours:string;


}
export const EmployeeTypeSchema = SchemaFactory.createForClass(EmployeeType);

export class EmployeeTypeDTO {
    @ApiProperty()
    typeName:string;

    @ApiProperty()
    workingHours:string;

}