/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Benefits } from "src/payroll/company/models/benefit.schema";
import { Deduction } from "src/payroll/company/models/deduction.schema";
import { Roles } from "src/user/models/user.schema";
import { PayInfo } from "../models/payinfo.schema";
import { Tier } from "../models/tier.schema";

@Injectable()
export class PayInfoService{
    constructor(@InjectModel(PayInfo.name) private payinfoModel:Model<PayInfo>,
                @InjectModel(Benefits.name) private benefitsModel:Model<Benefits>,
                @InjectModel(Deduction.name) private deductionModel:Model<Deduction>,
                @InjectModel(Tier.name) private tierModel:Model<Tier>
                ){}

    async create(data:PayInfo){
      let duplicate= await this.payinfoModel.findOne({userID:data.userID});
      if(duplicate){
        throw new HttpException('Payment information for this user has already been added', HttpStatus.BAD_REQUEST);
      }
      else{
        /*let checkmaxtier = await this.tierModel.find();
        console.log(checkmaxtier);
        
        for(let one of checkmaxtier){
          let maximum= one.max;
          console.log(one);
          
          let basicSalary= data.salaryInfo.basicSalary;
          if (basicSalary > maximum){
            throw new HttpException('This Salary is not within your tax tires',HttpStatus.NOT_ACCEPTABLE);
          }
        }*/
        return await (await this.payinfoModel.create(data));
      }
      }

    async findAll() {
        return this.payinfoModel.find().populate('userID','firstName lastName');
      }
    
    async findOne(id: ObjectId) {
        const payinfo = await this.payinfoModel.findOne({userID:id}).populate('userID','firstName lastName');
        if(!payinfo){
          throw new NotFoundException('This information cannot be found,Please add Payment information for this user');
        }else{
        let benefitids= payinfo.benefitIDs;
        let sum=0;
        for(let benefit of benefitids){
         let oneBenefit= await this.benefitsModel.findById(benefit);
         let singleAmount=oneBenefit.amount;
          sum+=singleAmount;      
        }      
        
        let deductionids = payinfo.deductionIDs;
        let deductionSum=0;
        for(let deduction of deductionids){
         let oneDeduction= await this.deductionModel.findById(deduction); 
         let singleAmount=oneDeduction.amount;
         deductionSum+=singleAmount;
         console.log(deductionSum);        
        }
          payinfo.totalBenefitsAmount=sum;
          payinfo.totalDeductionsAmount=deductionSum;
          await payinfo.save();
          return payinfo;
        }
      }
    
    async delete(id:ObjectId) {
      return await this.payinfoModel.findByIdAndRemove(id);
      }
    
    async update(id: ObjectId, data:Partial<PayInfo>,user) {
      let payInfo = await this.payinfoModel.findById(id);
        if(payInfo){
            if( user.role == Roles.USER){
                throw new HttpException('User not permitted to change Payment Information', HttpStatus.BAD_REQUEST);
            }
          return await this.payinfoModel.findByIdAndUpdate(id, data , {new:true})
        } else {
          throw new HttpException(`Payment information with id ${id} not updated`, HttpStatus.NOT_FOUND);
        }
    }

}