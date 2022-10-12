/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { ObjectId, SchemaTypes } from "mongoose";
import { Document } from "mongoose";
import { User } from "src/user/models/user.schema";
import { PayInfo } from "./payinfo.schema";

export enum Status{
    OPEN="OPEN",
    APPROVED="APPROVED"
}

@Schema({
    timestamps:true
})
export class PayRoll extends Document{

    @Prop({type:[SchemaTypes.ObjectId],required:true,ref:User.name})
    userID:ObjectId[];

    @Prop({type:[SchemaTypes.ObjectId],required:true,ref:PayInfo.name})
    payInfo:ObjectId[];

    @Prop()
    batchName:string;

    @Prop()
    status:Status;

    @Prop()
    dueDate:string;

    @Prop()
    totalSalaryAmount:number;

    @Prop()
    totalDeductionsAmount:number;

    @Prop()
    totalBenefitsAmount:number;

}
export const PayRollSchema = SchemaFactory.createForClass(PayRoll);

export class PayRollDTO{

    @ApiProperty()
    userID:[ObjectId];

    payInfo:any[];

    batchName:string;

    status:Status;

    dueDate:string;

}