/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document} from "mongoose";

@Schema({
    timestamps:true
})
export class Company extends Document{

    @Prop()
    companyName:string;

    @Prop()
    location:string;

    @Prop()
    poBox:string;

    @Prop()
    tagLine:string;

    @Prop()
    branches:string;

}
export const CompanySchema = SchemaFactory.createForClass(Company);

export class CompanyDTO {
    @ApiProperty()
    companyName:string;

    @ApiProperty()
    location:string;

    @ApiProperty()
    poBox:string;

    @ApiProperty()
    tagLine:string;

    @ApiProperty()
    branches:string;

}