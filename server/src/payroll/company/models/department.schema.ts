/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document, mongo, ObjectId} from "mongoose";

@Schema({
    timestamps:true
})
export class Department extends Document{
    @Prop()
    departmentName:string;

    @Prop()
    numOfEmployeesOnLeave:number;

    @Prop()
    activeEmployees:number;

    @Prop()
    numOfEmployees:number;

    @Prop()
    basicSalary:number;
    
    @Prop({type:mongoose.Types.ObjectId,ref:'Company'})
    companyID:ObjectId;
      
    @Prop()
    isSalaryDeterminedByDepartment:boolean;

    @Prop({type:[mongoose.Schema.Types.ObjectId], ref:'User'})
    head:[ObjectId]
}
export const DepartmentSchema = SchemaFactory.createForClass(Department);

export class DepartmentDTO{
    @ApiProperty()
    departmentName:string;

    numOfEmployeesOnLeave:number;

    activeEmployees:number;

    numOfEmployees:number;

    @ApiProperty()
    basicSalary:number;

    @ApiProperty()
    companyID:ObjectId;
 
    @ApiProperty()
    isSalaryDeterminedByDepartment:boolean;

    @ApiProperty()
    head:[ObjectId]
}