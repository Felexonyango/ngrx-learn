/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, SchemaTypes} from "mongoose";
import { Benefits } from "src/payroll/company/models/benefit.schema";
import { Deduction } from "src/payroll/company/models/deduction.schema";
import { User } from "src/user/models/user.schema";

@Schema({
    timestamps:true
})
export class PayInfo extends Document{
    @Prop({type:Object})
    salaryInfo:{
      basicSalary:number;
      grossSalary:number,
      taxableIncome:number,
      netPay:number,
      PAYE:number,
      insuranceRelief:number,
      personalRelief:number,
      taxRelief:number,
      taxPayable:number,
      nhif:number,
      nssf:number
    }
    @Prop({type:SchemaTypes.ObjectId,ref:User.name})
    userID:ObjectId;

    @Prop()
    totalDeductionsAmount:number;

    @Prop()
    totalBenefitsAmount:number;

    @Prop({type:[SchemaTypes.ObjectId],ref:Benefits.name})
    benefitIDs:ObjectId[];

    @Prop({type:[SchemaTypes.ObjectId],ref:Deduction.name})
    deductionIDs:ObjectId[];

}
export const PayInfoSchema = SchemaFactory.createForClass(PayInfo);