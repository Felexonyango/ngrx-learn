/* eslint-disable prettier/prettier */
import { ObjectId } from "mongoose";

export class PaySlipDto{
    basicSalary:number;
    houseAllowance:number;
    pension:number;
    overtimeFee:number;
    bonus:number;
    holidayAllowance:number;
    transferAllowance:number;
    otherAllowance:number;
    grossSalary:number;
    nssf:number;
    additionalVoluntaryContribution:number;
    taxPayable:number;
    PAYE:number;
    nhif:number;
    helb:number;
    insuranceDeduction:number;
    bankLoan:number;
    saccoLoan:number;
    saccoContribution:number;
    saccoAdvance:number;
    medicalcoverDeduction:number;
    staffAdvance:number;
    taxableIncome:number;
    shortageAndVariance:number;
    totalDeductions:number;
    netPay:number;
    userID:ObjectId;
}