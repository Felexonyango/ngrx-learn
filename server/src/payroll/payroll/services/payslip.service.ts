/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Db } from "mongodb";
import { Model, ObjectId } from "mongoose";
import { Benefits } from "src/payroll/company/models/benefit.schema";
import { Deduction } from "src/payroll/company/models/deduction.schema";
import { User } from "src/user/models/user.schema";
import { NhifTier } from "../models/nhif.schema";
import { PayInfo } from "../models/payinfo.schema";
import { PayrollDto } from "../models/payroll.dto";
  import { PayRoll, Status } from "../models/payroll.schema";
import { PaySlip } from "../models/payslip.schema";
import { Tier } from "../models/tier.schema";

@Injectable()
export class PaySlipService{

    constructor (
                 @InjectModel(PaySlip.name) private paySlipModel:Model <PaySlip>,
                 @InjectModel(Tier.name) private tierModel:Model <Tier>,
                 @InjectModel(User.name) private userModel:Model <User>,
                 @InjectModel(Deduction.name) private deductionModel:Model <Deduction>,
                 @InjectModel(Benefits.name) private benefitsModel:Model <Benefits>,
                 @InjectModel(PayInfo.name) private payinfoModel:Model<PayInfo>,
                 @InjectModel(PayRoll.name) private payrollModel:Model<PayRoll>,
                 @InjectModel(NhifTier.name) private nhifTierModel:Model <NhifTier>){}
  
  
    async findAllpaySlips(userId) {
        return await this.paySlipModel.find({userID:userId});
        
      }
    
    async findOnePaySlip(userId: ObjectId,payslipID:ObjectId) {
        const user = await this.paySlipModel.findOne({userID:userId});
        if(!user){
          throw new NotFoundException('This information cannot be found');
        }else{
          return await this.paySlipModel.findById(payslipID).populate('userID','firstName lastName phoneNumber email ');
        }
        }
    
   /* async delete(id:ObjectId) {
      return await this.payinfoModel.findByIdAndRemove(id);
      }
    
    async update(id: ObjectId, payinfo: Partial<payinfoDto>) {
        const slipInfoUptodate = await this.findOne(id);
        if(slipInfoUptodate){
          return await this.payinfoModel.findByIdAndUpdate(id, payinfo, {new:true})
        } else {
          throw new HttpException(`Payslip information with id ${id} not updated`, HttpStatus.NOT_FOUND);
        }
      } */

    
    async generatePaySlipForMonth(userID:ObjectId){
      

        let personInfo= await this.payinfoModel.findOne({userID:userID}); 
        let payslip = new this.paySlipModel();
        let payroll= await this.payrollModel.findOne({userID:userID});
        
        /*if(payroll.status==Status.OPEN){
          throw new HttpException('PaySlip has not been approved', HttpStatus.BAD_REQUEST);        
        }*/
        if(personInfo){
            let benefitids= personInfo.benefitIDs;
            let sum=0;
            for(let benefit of benefitids){
             let oneBenefit= await this.benefitsModel.findById(benefit);    
             let singleAmount=oneBenefit.amount;
              sum+=singleAmount;
                     
            }

            let deductionids= personInfo.deductionIDs
            let deductionSum=0;
            for(let deduction of deductionids){
             let oneDeduction= await this.deductionModel.findById(deduction);
             let singleAmount=oneDeduction.amount;
              deductionSum+=singleAmount; 
                   
            }
            let basicSalary= personInfo.salaryInfo.basicSalary;
            
            let grossSalary = basicSalary + sum;  
            personInfo.salaryInfo.grossSalary =  grossSalary;
            payslip.grossSalary =  grossSalary;


            
            let taxableIncome= personInfo.salaryInfo.grossSalary- personInfo.salaryInfo.insuranceRelief- personInfo.salaryInfo.taxRelief;
            personInfo.salaryInfo.taxableIncome =  taxableIncome;
            payslip.taxableIncome =  taxableIncome;
            
            let tiers= await this.tierModel.findOne({$and: [{min: {$lt:taxableIncome}},{max: {$gt:taxableIncome}}]});
            
            if(!tiers) {
              tiers = await this.tierModel.findOne({tier:3});
            }
            
            switch (tiers.tier) {
              case 1:
              let tier= await this.tierModel.findOne({tier:1});
              let taxPayablee= tier.percentage * tier.max;
              personInfo.salaryInfo.personalRelief= taxPayablee;
              personInfo.salaryInfo.taxPayable=taxPayablee
              payslip.taxPayable= taxPayablee;
                break;
              
              case 2:

              let tierOne= await this.tierModel.findOne({tier:1});
              let tierTwo= await this.tierModel.findOne({tier:2});

              let taxPayable1= tierOne.percentage * tierOne.max;
              let taxPayable2= tierTwo.percentage * tierTwo.increaseValue;

              let taxPayable=taxPayable1 + taxPayable2;
              personInfo.salaryInfo.taxPayable= taxPayable;
              payslip.taxPayable= taxPayable;

                break;

              case 3:
              let tier2= await this.tierModel.findOne({tier:2});
              let tier3= await this.tierModel.findOne({tier:3});
              let tier1= await this.tierModel.findOne({tier:1});  //TODO: declare variables outside the loop eg; let tier1; then assign values at this piont tier1=await this.tierModel.findOne({tier:1});

              let tax1= tier1.percentage * tier1.max;
              let tax2= tier2.percentage * tier2.increaseValue;
              let tax3= tier3.percentage *(taxableIncome-tier3.min);
              let taxPayabl=tax1 + tax2 + tax3;
              personInfo.salaryInfo.taxPayable= taxPayabl;
              payslip.taxPayable= taxPayabl;
                break;
            
              default:
                break;
            }

            let nhifTiers= await this.nhifTierModel.findOne({$and: [{min: {$lt:grossSalary}},{max: {$gt:grossSalary}}]});
            if(!nhifTiers) {
              nhifTiers = await this.nhifTierModel.findOne({tier:17});
            }
            
            switch (nhifTiers.nhifTier) {
              case 1:
                let tier1=await this.nhifTierModel.findOne({nhifTier:1});
                personInfo.salaryInfo.nhif=tier1.nhif;
                payslip.nhif= tier1.nhif;
                break;

              case 2:
                let tier2=await this.nhifTierModel.findOne({nhifTier:2});
                personInfo.salaryInfo.nhif=tier2.nhif;
                payslip.nhif= tier2.nhif;
                break;
              
              case 3:
                let tier3=await this.nhifTierModel.findOne({nhifTier:3});
                personInfo.salaryInfo.nhif=tier3.nhif;
                payslip.nhif= tier3.nhif;
                break;

              case 4:
                let tier4=await this.nhifTierModel.findOne({nhifTier:4});
                personInfo.salaryInfo.nhif=tier4.nhif;
                payslip.nhif= tier4.nhif;
                break;

              case 5:
                let tier5=await this.nhifTierModel.findOne({nhifTier:5});
                personInfo.salaryInfo.nhif=tier5.nhif;
                payslip.nhif= tier5.nhif;
                break;

              case 6:
                let tier6=await this.nhifTierModel.findOne({nhifTier:6});
                personInfo.salaryInfo.nhif=tier6.nhif;
                payslip.nhif= tier6.nhif;
                break;

              case 7:
                let tier7=await this.nhifTierModel.findOne({nhifTier:7});
                personInfo.salaryInfo.nhif=tier7.nhif;
                payslip.nhif= tier7.nhif;
                break;

              case 8:
                let tier8=await this.nhifTierModel.findOne({nhifTier:8});
                personInfo.salaryInfo.nhif=tier8.nhif;
                payslip.nhif= tier8.nhif;
                break;

              case 9:
                let tier9=await this.nhifTierModel.findOne({nhifTier:9});
                personInfo.salaryInfo.nhif=tier9.nhif;
                payslip.nhif= tier9.nhif;
                break;

              case 10:
                let tier10=await this.nhifTierModel.findOne({nhifTier:10});
                personInfo.salaryInfo.nhif=tier10.nhif;
                payslip.nhif= tier10.nhif;
                break;
              
              case 11:
                let tier11=await this.nhifTierModel.findOne({nhifTier:11});
                personInfo.salaryInfo.nhif=tier11.nhif;
                payslip.nhif= tier11.nhif;
                break;

              case 12:
                let tier12=await this.nhifTierModel.findOne({nhifTier:12});
                personInfo.salaryInfo.nhif=tier12.nhif;
                payslip.nhif= tier12.nhif;
                break;

              case 13:
                let tier13=await this.nhifTierModel.findOne({nhifTier:13});
                personInfo.salaryInfo.nhif=tier13.nhif;
                payslip.nhif= tier13.nhif;
                break;

              case 14:
                let tier14=await this.nhifTierModel.findOne({nhifTier:14});
                personInfo.salaryInfo.nhif=tier14.nhif;
                payslip.nhif= tier14.nhif;
                break;

              case 15:
                let tier15=await this.nhifTierModel.findOne({nhifTier:15});
                personInfo.salaryInfo.nhif=tier15.nhif;
                payslip.nhif= tier15.nhif;
                break;

              case 16:
                let tier16=await this.nhifTierModel.findOne({nhifTier:16});
                personInfo.salaryInfo.nhif=tier16.nhif;
                payslip.nhif= tier16.nhif;
                break;

              case 17:
                let tier17=await this.nhifTierModel.findOne({nhifTier:17});
                personInfo.salaryInfo.nhif=tier17.nhif;
                payslip.nhif= tier17.nhif;
                break;
                
              default:
                break;
            }
            
            let PAYE= personInfo.salaryInfo.taxPayable-personInfo.salaryInfo.insuranceRelief-personInfo.salaryInfo.taxRelief;        
            personInfo.salaryInfo.PAYE =  PAYE;
            payslip.PAYE =  PAYE;

            personInfo.salaryInfo.nssf = 200; 
            payslip.nssf=200;
            payslip.taxRelief=personInfo.salaryInfo.taxRelief;
            payslip.insuranceRelief=personInfo.salaryInfo.insuranceRelief;
            let netPay= personInfo.salaryInfo.grossSalary - deductionSum- PAYE-personInfo.salaryInfo.nssf-personInfo.salaryInfo.nhif;
            personInfo.salaryInfo.netPay =  netPay;
            payslip.netPay =  netPay;
            await personInfo.save();
            }else{
                throw new NotFoundException ('The payslip information for this user cannot be found');
            }

            payslip.userID = userID;
            let paySlip = await this.paySlipModel.findOne({userID:payslip.userID,$expr: [{ $month: '$createdAt'}]});
            
            if (paySlip){
              throw new HttpException('Your PaySlip For this Month Already Exists', HttpStatus.BAD_REQUEST);
            }else{
            return await (await payslip.save()).populate('userID','firstName lastName email department employeeIdNumber ');
            }
        }


    async findaMonthSlipforOneUser(userID: ObjectId, data: {year: number, month: number} ){
            let paySlip= await this.paySlipModel.findOne({$and: [{ userID: userID}, { $expr: { $eq: [{ $year: '$createdAt' }, 
            data.year] } }, { $expr: { $eq: [{ $month: '$createdAt' }, data.month] } }]});
            if(paySlip){
              return paySlip;
            } else {
              throw new HttpException('Payslip for user does not exist', HttpStatus.NOT_FOUND);
            }
    }

    async findYearSlipForOneUser(userID:ObjectId, data: {year: number} ){
        let paySlip= await this.paySlipModel.find({$and: [{userID}, { $expr: { $eq: [{ $year: '$createdAt' }, 
        data.year] } }]});
        if(paySlip){
          return paySlip;
        } else {
          throw new HttpException('Payslip for user does not exist', HttpStatus.NOT_FOUND);
        }
    }



}
