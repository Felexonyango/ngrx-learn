import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Deduction } from "../models/deduction.schema";

@Injectable()
export class DeductionService{

    constructor (@InjectModel(Deduction.name) private deductionModel:Model <Deduction>){}
  
    async create(deduction:Deduction){
      let duplicate= await this.deductionModel.findOne({name:deduction.name});
      if(duplicate){
        throw new HttpException('This deduction has already been added', HttpStatus.BAD_REQUEST);
      }
      return await this.deductionModel.create(deduction);
    }
  
    async findAll() {
      return this.deductionModel.find();
    }
    
    async findOne(id: ObjectId) {
        const deduction = await this.deductionModel.findById(id);
        if(!deduction){
          throw new NotFoundException('This information cannot be found'); //TODO:use a single method of throwing errors
        }else{
          return deduction;
        }
    }
    
    async delete(id:ObjectId) {
      return await this.deductionModel.findByIdAndRemove(id);
    }
    
    async update(id: ObjectId, deduction:Partial<Deduction>) {
      const deductionInfo = await this.findOne(id);
      if(deductionInfo){
        return await this.deductionModel.findByIdAndUpdate(id, deduction, {new:true})
      } else {
        throw new HttpException(`Deduction information with id ${id} not updated`, HttpStatus.NOT_FOUND); ///TODO: not found is mostly for urls use BAD_REQUEST or UNPROCESSABL_ENTITY
      }
    }
}