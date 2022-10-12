import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { EmployeeType } from "../models/employeetype.schema";

@Injectable()
export class EmployeeTypeService{

    constructor (@InjectModel(EmployeeType.name) private employeetypeModel:Model <EmployeeType>){}
  
    async create(data:EmployeeType){
      let duplicate= await this.employeetypeModel.findOne({typeName:data.typeName});
      if(duplicate){
        throw new HttpException('This employee type has already been added', HttpStatus.BAD_REQUEST);
      }
        return await this.employeetypeModel.create(data);
      }
  
    async findAll() {
        return this.employeetypeModel.find();
      }
    
    async findOne(id: ObjectId) {
        const employeetype = await this.employeetypeModel.findById(id);
        if(!employeetype){
          throw new NotFoundException('This information cannot be found'); //TODO:use a single method of throwing errors
        }else{
          return employeetype;
        }
        }
    
    async delete(id:ObjectId) {
      return await this.employeetypeModel.findByIdAndRemove(id);
      }
    
    async update(id: ObjectId, employeetype:Partial<EmployeeType>) {
        const employeetypeInfo = await this.findOne(id);
        if(employeetypeInfo){
          return await this.employeetypeModel.findByIdAndUpdate(id, employeetype, {new:true})
        } else {
          throw new HttpException(`Employeetype information with id ${id} not updated`, HttpStatus.NOT_FOUND); ///TODO: not found is mostly for urls use BAD_REQUEST or UNPROCESSABL_ENTITY
        }
    }
}