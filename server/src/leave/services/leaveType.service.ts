import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId } from "bson";
import { Model } from "mongoose";
import { LeaveType } from "../models/leaveType.schema";

@Injectable()
export class LeaveTypeService {
    constructor(@InjectModel(LeaveType.name) private leaveTypeModel:Model<LeaveType>){}

    async getLeaveTypes(){
        return await this.leaveTypeModel.find();
    }

    async getLeaveTypeById(leaveTypeId){
        return await this.leaveTypeModel.findById(leaveTypeId);
    }

    async postLeaveType(data:LeaveType){
        const leaveTypes = await this.leaveTypeModel.find();
        leaveTypes.forEach((item) => {
            if(item.leaveType?.toString().toLowerCase() === data.leaveType.toString().toLowerCase()){
                throw new HttpException('Leave type already exists', HttpStatus.BAD_REQUEST);
            }
        })

        return await new this.leaveTypeModel(data).save(); 
    } 

    async updateLeaveType(id:ObjectId, data:LeaveType){
        const leaveTypes = await this.leaveTypeModel.find();
        
        if(data.leaveType){
            leaveTypes.forEach((item) => {
                if(item.leaveType?.toString().toLowerCase() === data.leaveType.toString().toLowerCase()){
                    throw new HttpException('Leave type already exists', HttpStatus.BAD_REQUEST);
                }
            })
        }
        return await this.leaveTypeModel.findByIdAndUpdate(id, data, {new:true});
    }

    async deleteLeaveType(id:ObjectId){
        return await this.leaveTypeModel.findByIdAndDelete(id);
    }

    async deleteAllLeaveTypes(){
        return await this.leaveTypeModel.deleteMany({});
    }
}