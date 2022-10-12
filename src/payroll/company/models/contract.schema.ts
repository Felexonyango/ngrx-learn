/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document, ObjectId} from "mongoose";
import { type } from "os";

export enum Status{
    VALID="VALID",
    OUTOFCONTRACT="OUTOFCONTRACT"
}

@Schema({
    timestamps:true
})
export class Contract extends Document{

    @Prop()
    contractLevel:string;

    @Prop()
    contractStart:Date;

    @Prop()
    contractEnd:Date;

    @Prop()
    status:Status;

    @Prop({type:[mongoose.Schema.Types.ObjectId],required:true,ref:'User'})
    userID:[ObjectId];

}
export const ContractSchema = SchemaFactory.createForClass(Contract);

export class ContractDTO {
    @ApiProperty()
    contractLevel:string;

    @ApiProperty()
    contractStart:Date;

    @ApiProperty()
    contractEnd:Date;

    @ApiProperty()
    status:Status;

    @ApiProperty()
    userID:ObjectId[];

}