/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
@Schema({
    timestamps:true
})
export class PaySlip extends Document{
    @Prop()
    basicSalary:number;

    @Prop()
    houseAllowance:number;

    @Prop()
    pension:number;

    @Prop()
    overtimeFee:number;

    @Prop()
    bonus:number;

    @Prop()
    holidayAllowance:number;

    @Prop()
    transferAllowance:number;

    @Prop()
    otherAllowance:number;

    @Prop()
    grossSalary:number;

    @Prop()
    nssf:number;

    @Prop()
    additionalVoluntaryContribution:number;

    @Prop()
    taxPayable:number;

    @Prop()
    PAYE:number;

    @Prop()
    nhif:number;

    @Prop()
    helb:number;

    @Prop()
    insuranceDeduction:number;

    @Prop()
    bankLoan:number;

    @Prop()
    saccoLoan:number;

    @Prop()
    saccoContribution:number;

    @Prop()
    saccoAdvance:number;

    @Prop()
    medicalcoverDeduction:number;

    @Prop()
    staffAdvance:number;

    @Prop()
    taxableIncome:number;

    @Prop()
    shortageAndVariance:number;

    @Prop()
    totalDeductions:number;

    @Prop()
    netPay:number;

    @Prop()
    personalRelief:number;

    @Prop()
    taxRelief:number;
    
    @Prop()
    insuranceRelief:number;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    userID:ObjectId;

}
export const PaySlipSchema = SchemaFactory.createForClass(PaySlip);