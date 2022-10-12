/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { type } from "os";
import { Benefits } from "src/payroll/company/models/benefit.schema";
import { Deduction } from "src/payroll/company/models/deduction.schema";
import { Roles } from "src/user/models/user.schema";
import { PayInfo } from "../models/payinfo.schema";
import { PayRoll, PayRollDTO, Status } from "../models/payroll.schema";

@Injectable()
export class PayrollService{
    constructor(@InjectModel(PayRoll.name) private payrollModel:Model<PayRoll>,
    @InjectModel(PayInfo.name) private payinfoModel:Model<PayInfo>,
    @InjectModel(Benefits.name) private benefitsModel:Model<Benefits>,
    @InjectModel(Deduction.name) private deductionModel:Model<Deduction>){}

    async create(data:PayRoll){

      let duplicate= await this.payrollModel.findOne({batchName:data.batchName});        
      if(duplicate){
        throw new HttpException('This payroll has already been added', HttpStatus.BAD_REQUEST);
      }

      let arr = []
      for(let id of data.userID){
        let singleUserPayInfo = await (await this.payinfoModel.findOne({userID:id}))._id;
        arr.push(singleUserPayInfo);
      }
       data.payInfo = [...arr];  
       
       const newPayroll =await this.payrollModel.create(data);
       newPayroll.payInfo=data.payInfo;
       await newPayroll.save();   
        return await this.payrollModel.findById(newPayroll._id); 
      }

    async findAll() {
        return this.payrollModel.find().populate('userID','firstName lastName employeeIdNumber').populate('payInfo');
      }
    
    async findOne(id: ObjectId) {
      let onepayroll = await this.payrollModel.findById(id).populate('userID payInfo');
      let sum= 0;
        let pay= await this.payinfoModel.find({userID:onepayroll.userID});
        
        for(let one of pay){
        let singleSalary=one.salaryInfo.basicSalary; 
        sum+=singleSalary;    
        } 

        let benefits= await this.payinfoModel.find({userID:onepayroll.userID});
        let benefitsum=0;
  
        for(let benefit of benefits){
         let onepersonstotalbenefits=benefit.totalBenefitsAmount;
          benefitsum+=onepersonstotalbenefits; 

        }      
        
        let deductions= await this.payinfoModel.find({userID:onepayroll.userID});
        let deductionSum=0;
        for(let deduction of deductions){
         let onepersonstotaldeductions=deduction.totalDeductionsAmount; 
          deductionSum+=onepersonstotaldeductions; 

        } 
        onepayroll.totalBenefitsAmount=benefitsum;
        onepayroll.totalDeductionsAmount=deductionSum;    
        onepayroll.totalSalaryAmount=sum;
        await onepayroll.save();
        if(!onepayroll){
          throw new NotFoundException('This information cannot be found');
        }else{
          return onepayroll;
        }
      }
    async delete(id:ObjectId) {
      return await this.payrollModel.findByIdAndRemove(id);
      }
    
    async update(id: ObjectId, data:PayRoll,user) {
      let payrollInfo = await this.payrollModel.findById(id);
        if(payrollInfo){
            if(data.status == Status.APPROVED && user.role == Roles.USER){

                throw new HttpException('User not permitted to change PayRoll status', HttpStatus.BAD_REQUEST);
            }
            let arr = []
            for(let id of data.userID){  
              let singleUserPayInfo = await (await this.payinfoModel.findOne({userID:id}))._id;
              arr.push(singleUserPayInfo);
            }
             data.payInfo = [...arr];  
             const newPayroll =await this.payrollModel.findByIdAndUpdate(id,data,{new:true});
             newPayroll.payInfo=data.payInfo;
             return await newPayroll.save();
        } else {
          throw new HttpException(`Payroll information with id ${id} not updated`, HttpStatus.NOT_FOUND);
        }
    }

    async changePayRollStatus(payrollId){
      let payroll = await this.payrollModel.findById(payrollId);
      payroll.status = Status.APPROVED;
      return await payroll.save();
  }

}