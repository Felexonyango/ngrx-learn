import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Benefits } from "../models/benefit.schema";
import { Company } from "../models/company.schema";

@Injectable()
export class BenefitService{

    constructor (@InjectModel(Benefits.name) private benefitModel:Model <Benefits>){}
  
    async create(benefits:Benefits){
      let duplicate= await this.benefitModel.findOne({name:benefits.name});
      if(duplicate){
        throw new HttpException('This benefit has already been added', HttpStatus.BAD_REQUEST);
      }
        return await this.benefitModel.create(benefits);
    }
  
    async findAll() {
        return this.benefitModel.find();
    }
    
    async findOne(id: ObjectId) {
        const benefit = await this.benefitModel.findById(id);
        if(!benefit){
          throw new NotFoundException('This information cannot be found'); //TODO:use a single method of throwing errors
        }else{
          return benefit;
        }
    }
    
    async delete(id:ObjectId) {
      return await this.benefitModel.findByIdAndRemove(id);
    }
    
    async update(id: ObjectId, benefit:Partial<Benefits>) {
        const benefitInfo = await this.findOne(id);
        if(benefitInfo){
          return await this.benefitModel.findByIdAndUpdate(id, benefit , {new:true})
        } else {
          throw new HttpException(`Benefit information with id ${id} not updated`, HttpStatus.NOT_FOUND); ///TODO: not found is mostly for urls use BAD_REQUEST or UNPROCESSABL_ENTITY
        }
    }
}