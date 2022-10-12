import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Contract, Status } from "../models/contract.schema";

@Injectable()
export class ContractService{

    constructor (@InjectModel(Contract.name) private contractModel:Model <Contract>){}
  
    async create(contract:Contract){
      let endDate = new Date(contract.contractEnd);
      let startDate = new Date(contract.contractStart);
      if(endDate < startDate){
        throw new HttpException('Contract end date should be greater than start date', HttpStatus.BAD_REQUEST);
      }
      let duplicate= await this.contractModel.findOne({contractLevel:contract.contractLevel});
      if(duplicate){
        throw new HttpException('This benefit has already been added', HttpStatus.BAD_REQUEST);
      }
      return await this.contractModel.create(contract);
    }

      async checkDate(id){
        const contract = await this.contractModel.findById(id);
        let today = new Date();
        let endDate = new Date(contract.contractEnd);
        if (today > endDate){
          contract.status = Status.OUTOFCONTRACT;
          return await contract.save();          
        }
      }
  
    async findAll() {      
        return this.contractModel.find();
      }
    
    async findOne(id: ObjectId) {
        const contract = await this.contractModel.findById(id);
        if(!contract){
          throw new NotFoundException('This information cannot be found'); //TODO:use a single method of throwing errors
        }else{
          let today = new Date();
          let endDate = new Date(contract.contractEnd);
          if (today > endDate){
            contract.status = Status.OUTOFCONTRACT;
        }
        return await contract.save(); 
        }
      }
    
    async delete(id:ObjectId) {
      return await this.contractModel.findByIdAndRemove(id);
      }
    
    async update(id: ObjectId, contract:Partial<Contract>) {
        const contractInfo = await this.findOne(id);
        if(contractInfo){
          return await this.contractModel.findByIdAndUpdate(id, contract, {new:true})
        } else {
          throw new HttpException(`Contract information with id ${id} not updated`, HttpStatus.NOT_FOUND); ///TODO: not found is mostly for urls use BAD_REQUEST or UNPROCESSABL_ENTITY
        }
    }
}