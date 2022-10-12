/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import mongoose, { Document, ObjectId } from "mongoose";

export enum Roles {
    USER = "USER",
    SUPERVISOR = "SUPERVISOR",
    USERADMIN = "USERADMIN",
    HUMANRESOURCE = "HUMANRESOURCE",
    DEPARTMENTHEAD = "DEPARTMENTHEAD"
}

@Schema()
export class User extends Document {
    @Prop()
    firstName:string;

    @ApiProperty()
    @Prop()
    lastName:string;

    @Prop()
    @ApiProperty()
    email:string;

    @Prop()
    @ApiProperty({enum:['USER', 'SUPERVISOR', 'USERADMIN', 'HUMANRESOURCE', 'DEPARTMENTHEAD']})
    role:Roles[];

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Department'})
    @ApiProperty()
    department:ObjectId;

    @Prop()
    password:string;

    @Prop()
    startDate:string;

    @Prop()
    @ApiProperty()
    nextOfKin:string;

    @Prop()
    @ApiProperty()
    idNumber:number;

    @Prop()
    @ApiProperty()
    kraPin:string;

    @Prop()
    @ApiProperty()
    bankAccountNumber:number;

    @Prop()
    @ApiProperty()
    bankName:string;

    @Prop()
    phoneNumber:number;

    @Prop()
    employeeIdNumber:string;

    @Prop()
    status:boolean;

    @Prop()
    taxRegNO: string;

    @Prop()
    swiftCode:string;

    @Prop()
    branchName:string;

    @Prop()
    bankCode:string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'EmployeeType'})
    employeeType:ObjectId;
}
export const UserSchema = SchemaFactory.createForClass(User);

export class UserDTO {
    @ApiProperty()
    firstName:string;

    @ApiProperty()
    lastName:string;

    @ApiProperty()
    email:string;
    
    @ApiProperty({enum:['USER', 'SUPERVISOR', 'USERADMIN', 'HUMANRESOURCE', 'DEPARTMENTHEAD']})
    role:Roles[];

    @ApiProperty()
    department:ObjectId;

    @ApiProperty()
    startDate:string;

    @ApiProperty()
    nextOfKin:string;

    @ApiProperty()
    idNumber:number;

    @ApiProperty()
    kraPin:string;

    @ApiProperty()
    bankAccountNumber:number;

    @ApiProperty()
    bankName:string;

    @ApiProperty()
    phoneNumber:number;

    @ApiProperty()
    employeeIdNumber:string;

    @ApiProperty()
    taxRegNO: string;

    @ApiProperty()
    swiftCode:string;

    @ApiProperty()
    branchName:string;

    @ApiProperty()
    bankCode:string;

    @ApiProperty()
    employeeType:ObjectId;
}

export class LoginDTO {
    @ApiProperty()
    email:string;

    @ApiProperty()
    password: string
}