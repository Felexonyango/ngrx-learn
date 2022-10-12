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
export class Benefits extends Document{


    @Prop()
    name:string;

    @Prop()
    amount:number;
    
}
export const BenefitsSchema = SchemaFactory.createForClass(Benefits);

export class BenefitsDTO {
    @ApiProperty()
    name:string;

    @ApiProperty()
    amount:number;
}