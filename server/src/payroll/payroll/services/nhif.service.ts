/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { NhifTier } from "../models/nhif.schema";

@Injectable()
export class NhifTierService{

    constructor (@InjectModel(NhifTier.name) private nhifModel:Model <NhifTier>){}
  
    async create(nhifModel:NhifTier){
      let duplicate= await this.nhifModel.findOne({nhifTier:nhifModel.nhifTier});
      if(duplicate){
        throw new HttpException('This nhif tier already exists', HttpStatus.BAD_REQUEST);
      }
        return await this.nhifModel.create(nhifModel);
      }
  
    async findAll() {
        return this.nhifModel.find();
      }
    
    async findOne(id: ObjectId) {
        const nhifTier = await this.nhifModel.findById(id);
        if(!nhifTier){
          throw new NotFoundException('This information cannot be found');
        }else{
          return nhifTier;
        }
        }
    
    async delete(id:ObjectId) {
      return await this.nhifModel.findByIdAndRemove(id);
      }
    
    async update(id: ObjectId, nhifModel:Partial<NhifTier>) {
        const tierInfo = await this.findOne(id);
        if(tierInfo){
          return await this.nhifModel.findByIdAndUpdate(id, nhifModel, {new:true})
        } else {
          throw new HttpException(`Tier information with id ${id} not updated`, HttpStatus.NOT_FOUND);
        }
    }
}