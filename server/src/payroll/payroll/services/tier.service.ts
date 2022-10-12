import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Tier } from "../models/tier.schema";

@Injectable()
export class TierService{

    constructor (@InjectModel(Tier.name) private tierModel:Model <Tier>){}
  
    async create(tierModel:Tier){
      let duplicate= await this.tierModel.findOne({tier:tierModel.tier});
      if(duplicate){
        throw new HttpException('This tier already exists', HttpStatus.BAD_REQUEST);
      }
        return await this.tierModel.create(tierModel);
      }
  
    async findAll() {
        return this.tierModel.find();
      }
    
    async findOne(id: ObjectId) {
        const tier = await this.tierModel.findById(id);
        if(!tier){
          throw new NotFoundException('This information cannot be found');
        }else{
          return tier;
        }
        }
    
    async delete(id:ObjectId) {
      return await this.tierModel.findByIdAndRemove(id);
      }
    
    async update(id: ObjectId, tierModel:Partial<Tier>) {
        const tierInfo = await this.findOne(id);
        if(tierInfo){
          return await this.tierModel.findByIdAndUpdate(id, tierModel, {new:true})
        } else {
          throw new HttpException(`Tier information with id ${id} not updated`, HttpStatus.NOT_FOUND);
        }
      }
}