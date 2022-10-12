import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Company } from "../models/company.schema";

@Injectable()
export class CompanyService{

    constructor (@InjectModel(Company.name) private companyModel:Model <Company>){}
  
    async create(company:Company){
        return await this.companyModel.create(company);
      }
  
    async findAll() {
        return this.companyModel.find();
      }
    
    async findOne(id: ObjectId) {
        const company = await this.companyModel.findById(id);
        if(!company){
          throw new NotFoundException('This information cannot be found'); //TODO:use a single method of throwing errors
        }else{
          return company;
        }
    }
    
    async delete(id:ObjectId) {
      return await this.companyModel.findByIdAndRemove(id);
    }
    
    async update(id: ObjectId, company:Partial<Company>) {
        const companyInfo = await this.findOne(id);
        if(companyInfo){
          return await this.companyModel.findByIdAndUpdate(id, company, {new:true})
        } else {
          throw new HttpException(`Company information with id ${id} not updated`, HttpStatus.NOT_FOUND); ///TODO: not found is mostly for urls use BAD_REQUEST or UNPROCESSABL_ENTITY
        }
    }
}