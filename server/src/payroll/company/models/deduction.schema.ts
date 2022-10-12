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
export class Deduction extends Document{


    @Prop()
    name:string;

    @Prop()
    amount:number;

}
export const DeductionSchema = SchemaFactory.createForClass(Deduction);  

export class DeductionsDTO {
    @ApiProperty()
    name:string;

    @ApiProperty()
    amount:number;
}                                               