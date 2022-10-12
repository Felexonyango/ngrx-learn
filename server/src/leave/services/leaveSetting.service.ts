import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId } from "bson";
import { Model } from "mongoose";
import { UserService } from "src/user/services/user.service";
import { LeaveSetting, LeaveSettingDTO } from "../models/leaveSettings.model";

@Injectable()
export class LeaveSettingService {
    constructor(
        @InjectModel(LeaveSetting.name) private leaveSettingModel:Model<LeaveSetting>,
        private userService:UserService
        ){}

    async getLeaveSetting(){
        return await this.leaveSettingModel.findOne();
    }

    async createLeaveSetting(data:LeaveSettingDTO){
        return await (await this.leaveSettingModel.create(data)).save();
    }

    async updateLeaveSetting(id:ObjectId, data:LeaveSettingDTO){        
        return await this.leaveSettingModel.findByIdAndUpdate(id, data, {new:true});
    }

    async deleteLeaveSetting(id:ObjectId){
        return await this.leaveSettingModel.findByIdAndDelete(id);
    }

    async deleteAllLeaveSetting(){
        return await this.leaveSettingModel.deleteMany({});
    }
}