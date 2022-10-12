import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cron } from "@nestjs/schedule";
import { ObjectId } from "bson";
import { Model } from "mongoose";
import { Holiday, HolidayDTO } from "../models/holiday.schema";
import { LeaveService } from "./leave.service";
import { PublicHolidayService } from "./publichols.service";

@Injectable()
export class HolidayService { 
    constructor(
        @InjectModel(Holiday.name) private holidayModel:Model<Holiday>,
        private publicHolidayService:PublicHolidayService,
        private leaveService:LeaveService
        ){}

    async createHoliday(data:HolidayDTO, user){
        data.appliedBy = user;
        const holidays = await this.holidayModel.find();

        let endDate = new Date(data.endDate);
        let startDate = new Date(data.startDate);
        
        if(endDate < startDate){
            throw new HttpException('Leave end date should be greater than start date', HttpStatus.BAD_REQUEST);
        }

        holidays.forEach((holiday) => {
            if(holiday.name?.toLowerCase().trim() === data.name.toLowerCase().trim()){
                throw new HttpException('Holiday already exists', HttpStatus.BAD_REQUEST);
            } 
            if(data.startDate >= holiday.startDate && data.startDate <= holiday.endDate || 
               data.endDate >= holiday.startDate && data.endDate <= holiday.endDate){
                    throw new HttpException('Select different dates to avoid holiday conflicts', HttpStatus.BAD_REQUEST)
            }
        });

        const publicHolidays = await this.publicHolidayService.getAllPublicHolidays();

        let daysToDeduct = 0;

        let numOfDays = await this.getDifferenceInDays(data.startDate, data.endDate);
        daysToDeduct = await this.leaveService.getWeekendNHolidayCountBetweenDates(new Date(data.startDate), new Date(data.endDate));
        data.leaveDays = numOfDays - daysToDeduct;
        return await new this.holidayModel(data).save();
    }

    async findSingleHoliday(id:ObjectId){
        return await this.holidayModel.findById(id);
    }

    async findAllHolidays(){
        return await this.holidayModel.find();
    }

    async updateHoliday(id:ObjectId, data:HolidayDTO, user){
        return await this.holidayModel.findByIdAndUpdate(id, data, {new:true});
    }

    async deleteHoliday(id:ObjectId){
        return await this.holidayModel.findByIdAndDelete(id);
    }

    async deleteAll(){
        return await this.holidayModel.deleteMany({});
    }

    async getDifferenceInDays(date1, date2) {
        const diffInMs = Math.abs(+(new Date(date2)) - +(new Date(date1)));
        return 1 + diffInMs / (1000 * 60 * 60 * 24);
    }

    @Cron('0 12 31 00 00')
    async updateHolidayDates(){
        const holidays = await this.findAllHolidays();
        holidays.forEach(async holiday => {
            if(holiday.recurring){
                let startDateYear = new Date(holiday.startDate);
                startDateYear.setFullYear(startDateYear.getFullYear() + 1);
    
                let endDateYear = new Date(holiday.endDate);
                endDateYear.setFullYear(endDateYear.getFullYear() + 1);
                
                let newHolidayDates = {
                    appliedBy: holiday.appliedBy,
                    name: holiday.name,
                    comment: holiday.comment,
                    startDate: startDateYear.toISOString().split('T')[0],
                    endDate: endDateYear.toISOString().split('T')[0],
                    leaveDays: holiday.leaveDays
                } as unknown as Holiday
    
                await this.updateHoliday(holiday._id, newHolidayDates, holiday.appliedBy); 
            }
        })
    }
}