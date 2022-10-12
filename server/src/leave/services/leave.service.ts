import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Cron, CronExpression } from "@nestjs/schedule";
import { Model, ObjectId } from "mongoose"
import { Leave, LeaveMode, Status } from "../models/leave.schema"
import { LeaveSettingService } from "./leaveSetting.service";
import { DepartmentService } from "src/payroll/company/services/department.service";
import { UserService } from "src/user/services/user.service";
import { Roles, User } from "src/user/models/user.schema";
import { LeaveTypeService } from './leaveType.service';
import { PublicHolidayService } from "./publichols.service";
import { MailService } from "src/mail/mail.service";
import { Holiday } from "../models/holiday.schema";

var mongoose = require('mongoose');

@Injectable()
export class LeaveService {

    constructor(
        private userService:UserService,
        @InjectModel(Leave.name) private leaveModel:Model<Leave>,
        @InjectModel(Holiday.name) private holidayModel:Model<Holiday>,
        @InjectModel(User.name) private userModel:Model<User>,
        private departmentService:DepartmentService,
        private leaveSettingService:LeaveSettingService,
        private leaveTypeService:LeaveTypeService,
        private publicHolidayService:PublicHolidayService,
        private mailService:MailService
        ){}

    async getLeaves(id){
        return await this.leaveModel.find({appliedBy:id}).populate('typeOfLeave', {leaveType:1}).populate({path:'appliedBy', populate:{path:'department'}}).sort({createdAt:-1});
    }

    async getAllLeavesApplied(userId:ObjectId){
        const departments = await this.departmentService.findDepartmentByHead(userId);
        const leaves = await this.leaveModel.find({status:'PENDING'}).populate('appliedBy', {firstName:1, lastName:1, department:1})
                       .populate('typeOfLeave', {leaveType:1}).sort({createdAt:-1});

        let leavesInDepartment = [];
        type userDetails = {
            _id:ObjectId,
            firstName:string,
            lastName:string,
            department:ObjectId
        }

        if(departments){
            for(let i = 0; i < leaves.length; i++){
                let { department } = leaves[i].appliedBy as unknown as userDetails;
                if(department != null){
                    let userDepartment = await this.departmentService.findOne(department);
                    if(String(departments._id) === String(userDepartment.department._id)){
                        leavesInDepartment.push(leaves[i]);
                    }
                }
            }
        }
        return leavesInDepartment;
    }

    async getAllLeavesAppliedInDepartment(userId:ObjectId){
        const departments = await this.departmentService.findDepartmentByHead(userId);
        const leaves = await this.leaveModel.find().populate('appliedBy', {firstName:1, lastName:1, department:1})
                       .populate('typeOfLeave', {leaveType:1}).sort({createdAt:-1});

        let leavesInDepartment = [];
        type userDetails = {
            _id:ObjectId,
            firstName:string,
            lastName:string,
            department:ObjectId
        }

        if(departments){
            for(let i = 0; i < leaves.length; i++){
                let { department } = leaves[i].appliedBy as unknown as userDetails;
                if(department){
                    let userDepartment = await this.departmentService.findOne(department);
                    if(String(departments._id) === String(userDepartment.department._id)){
                        leavesInDepartment.push(leaves[i]);
                    }
                }
            }
        }
        
        return leavesInDepartment;
    }

    async getAllLeavesForSupervisor(){
        return await this.leaveModel.find({status:'PENDING'}).populate('appliedBy', {firstName:1, lastName:1}).populate('typeOfLeave', {leaveType:1}).sort({created:-1});
    }

    async getAllLeaves(){
        return await this.leaveModel.find().populate('appliedBy', {firstName:1, lastName:1}).populate('typeOfLeave', {leaveType:1}).sort({created:-1});
    }

    async getSingleLeave(id){
        return await this.leaveModel.findById(id).populate('typeOfLeave', {leaveType:1}).populate('appliedBy', {firstName:1, lastName:1});
    }

    async getPublicHolidays(){
        return await this.publicHolidayService.getAllPublicHolidays();
    }

    async getAllHolidays(){
        return await this.holidayModel.find();
    }

    async getUserAppliedAndApprovedLeaves(userId){
        return await this.leaveModel.find({appliedBy:userId})
    }

    async postLeave(data, userId){

        let startSliced = data.startDate.slice(0,10)
        let endDate = new Date(data.endDate.slice(0,10));
        let startDate = new Date(startSliced);
        
        data.checked = false;
        data.reportDate = data.endDate;
        let leaveTypeApplied = await this.leaveTypeService.getLeaveTypeById(data.typeOfLeave);
        let checkLeaveTypeIsSick = leaveTypeApplied.leaveType.toString().toLowerCase().search('sick');

        if(endDate < startDate){
            throw new HttpException('Leave end date should be greater than start date', HttpStatus.BAD_REQUEST);
        }

        const userAppliedLeaves = await this.getUserAppliedAndApprovedLeaves(userId);
        
        userAppliedLeaves.forEach((leave) => {
            
            if(startDate >= new Date(leave.startDate) && endDate <= new Date(leave.endDate)){
                throw new HttpException(`A leave already exists in dates ${leave.startDate} to ${leave.endDate}`, HttpStatus.BAD_REQUEST);
            }

            if(startDate >= new Date(leave.startDate) && startDate <= new Date(leave.endDate)){
                throw new HttpException(`Please change start date to a date earlier than ${leave.startDate} or later than ${leave.endDate}`, HttpStatus.BAD_REQUEST);
            }

            if(endDate >= new Date(leave.startDate) && endDate <= new Date(leave.endDate)){
                throw new HttpException(`Please change end date to earlier than ${leave.startDate} or later than ${leave.endDate}`, HttpStatus.BAD_REQUEST);
            }
        })

        let holidays = await this.getAllHolidays();
        holidays.forEach(holiday => {
            if(startDate.getTime() >= new Date(holiday.startDate).getTime() && endDate.getTime() <= new Date(holiday.startDate).getTime()){
                throw new HttpException('Leave cannot be during the holiday', HttpStatus.BAD_REQUEST);
            }
        }) 

        let publicHolidays =  await this.publicHolidayService.getAllPublicHolidays();
        
        publicHolidays.forEach(holiday => {
            if(new Date(holiday.date).getTime() >= startDate.getTime() && new Date(holiday.date).getTime() <= endDate.getTime()){
                data.requested = data.requested - 1;
            }
        });

        if(checkLeaveTypeIsSick == -1){
            if(startDate < new Date(Date.now())){
                throw new HttpException('Start date cannot be in the past', HttpStatus.BAD_REQUEST)
            }
        }

        const user = await this.userModel.findById(userId);
        // const userDepartment = user.department
        // console.log(user.department);
        // if(user.department){
        //     const department = await this.departmentService.findOne(user.department);
            
        //     type userDet = {
        //         _id: ObjectId,
        //          firstName: string,
        //          lastName: string,
        //          email: string,
        //          role: string,
        //          department: ObjectId,
        //          password: string,
        //          startDate: string,
        //          nextOfKin: string,
        //          idNumber: number,
        //          kraPin: string,
        //          bankAccountNumber: number,
        //          bankName: string,
        //          phoneNumber: number,
        //          employeeIdNumber: string,
        //          status: boolean,
        //     }
    
        //     const { _id } = department.department.head[0] as unknown as userDet;
            
        //     const depHead = await this.userModel.findById(_id);
        //     let email = {
        //         to:depHead.email,
        //         subject:'Leave Approval',
        //         text:`${user.firstName}${user.lastName} has applied leave as from ${startDate} to ${endDate}`
        //     }
        //     await this.mailService.sendMail(email);
        // }
        const userDet = await this.userModel.find();
        const supervisor = userDet.filter(item => item.role.includes(Roles.SUPERVISOR));
        const validUsers = supervisor.filter(item => item.email != 'supervisor@gmail.com');
        
        for(let i = 0; i < validUsers.length; i++){
            let email = {
                        to:validUsers[i].email,
                        subject:'Leave Approval',
                        text:`${user.firstName}${user.lastName} has applied leave as from ${startDate} to ${endDate}`
                    }
            await this.mailService.sendMail(email);
        }

        if(data.modeOfLeave == LeaveMode.PARTIAL){
            let hourlyDiff = Math.abs(+(endDate.getHours()) - +startDate.getHours());
            data.requested = hourlyDiff;
        }  else {
            let totalDaysRequested = await this.getDifferenceInDays(data.endDate, data.startDate);
            let startDate = new Date(data.startDate.slice(0,10));
            let endDate = new Date(data.endDate.slice(0,10));
            let weekendDays = await this.getWeekendNHolidayCountBetweenDates(startDate, endDate);
            data.requested = totalDaysRequested - weekendDays;
            console.log('Requested days', data.requested);
            return await new this.leaveModel(data).save();
        }
    }

    async updateLeave(id, data, user){
        
        let endDate = new Date(data.endDate);
        let startDate = new Date(data.startDate);
        let requested = 0;
        if(endDate < startDate){
            throw new HttpException('Leave end date should be greater than start date', HttpStatus.BAD_REQUEST);
        }
        
        if(startDate < new Date(Date.now())){
            throw new HttpException('Start date cannot be in the past', HttpStatus.BAD_REQUEST)
        }

        if(data.status == Status.APPROVED || Status.CANCELLED && user.role == Roles.USER){
            throw new HttpException('User not permitted to change Leave status', HttpStatus.BAD_REQUEST);
        }

        const userAppliedLeaves = await this.getLeaves(user.userId);
        userAppliedLeaves.forEach((leave) => {
            if(startDate >= new Date(leave.startDate) && startDate <= new Date(leave.endDate)){
                throw new HttpException(`Please change start date to a date earlier than ${leave.startDate} or later than ${leave.endDate}`, HttpStatus.BAD_REQUEST);
            }

            if(endDate >= new Date(leave.startDate) && endDate <= new Date(leave.endDate)){
                throw new HttpException(`Please change end date to earlier than ${leave.startDate} or later than ${leave.endDate}`, HttpStatus.BAD_REQUEST);
            }
        })
        
        let holidays = await this.getAllHolidays();
        holidays.forEach(holiday => {
            if(startDate >= new Date(holiday.startDate) && startDate < new Date(holiday.endDate) || endDate > new Date(holiday.startDate) && endDate <= new Date(holiday.endDate)){
                throw new HttpException('Leave cannot be during the holiday', HttpStatus.BAD_REQUEST);
            }
        }) 

        if(data.modeOfLeave == LeaveMode.PARTIAL){
            let hourlyDiff = Math.abs(+(endDate.getHours()) - +startDate.getHours());
            data.requested = hourlyDiff;
        } else {
            requested =  await this.getDifferenceInDays(data.endDate, data.startDate);
            let startDate = new Date(data.startDate);
            let endDate = new Date(data.endDate);
            let weekendDays = await this.getWeekendNHolidayCountBetweenDates(startDate, endDate);
            data.requested = (requested - weekendDays) + 1;
        }
        return await this.leaveModel.findByIdAndUpdate(id, data, {new:true});
    }

    async approveLeaveStatus(id, userId){
        let leave = await this.getSingleLeave(id);
        if(leave.appliedBy == userId) throw new HttpException('Cannot approve your own leave', HttpStatus.BAD_REQUEST);
        leave.status = Status.APPROVED;
        leave.reviewedBy = userId;
        let user = await this.userService.findSingleUser(leave.appliedBy);
        let data = {
            to:user.email,
            subject:'Leave Approval',
            text:`You're leave request starting from date : ${leave.startDate} to date : ${leave.endDate} has been approved.`
        }
        await this.mailService.sendMail(data);
        return await leave.save();
    }

    async cancelLeaveStatus(id, userId){
        let leave = await this.getSingleLeave(id);
        if(leave.appliedBy == userId) throw new HttpException('Cannot cancel your leave request', HttpStatus.BAD_REQUEST);
        leave.status = Status.CANCELLED;
        leave.reviewedBy = userId;
        let user = await this.userService.findSingleUser(leave.appliedBy);
        let data = {
            to:user.email,
            subject:'Leave Denial',
            text:`You're leave request starting from date : ${leave.startDate} to date : ${leave.endDate} has been denied.`
        }
        await this.mailService.sendMail(data);
        return await leave.save();
    }

    async deleteLeave(id){
        return await this.leaveModel.findByIdAndDelete(id);
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async updateUserLeaveDates(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();

        let dateToday = yyyy + '-' + mm + '-' + dd;
        
        const leaveStartingFromToday = await this.leaveModel.find({startDate:{$regex:`${dateToday}`}, status:'APPROVED', checked:false});
        const leaveDays = await this.leaveSettingService.getLeaveSetting();

        leaveStartingFromToday.forEach( async ( leave ) => {
            let user = await this.userService.findSingleUser(leave.appliedBy);
            user.status = false;
            if(leave.modeOfLeave == LeaveMode.PARTIAL) {
                leave.checked = true;
                await this.updateDepartmentsRecords(leave);
            } else {
                leave.checked = true;
                await this.updateDepartmentsRecords(leave);
            }
            
            await user.save();
            await leave.save();
        })
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async updateUserStatusOnLeaveEnd(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();

        let dateToday = yyyy + '-' + mm + '-' + dd;

        const leaveStartingFromToday = await this.leaveModel.find({endDate:{$regex:`${dateToday}`}, status:'APPROVED', checked:true});
        leaveStartingFromToday.forEach(async leave => {
            let user = await this.userService.findSingleUser(leave.appliedBy);
            user.status = true;
            await user.save();
        })
    }

    async getDifferenceInDays(date1, date2) {
        const diffInMs = Math.abs(+(new Date(date2)) - +(new Date(date1)));
        return 1 + diffInMs / (1000 * 60 * 60 * 24);
    }

    async getHolidayLeave(){
        return await this.leaveModel.find({typeOfLeave:'HOLIDAY'})
    }

    async leaveAlmostOver(){
        let leaves = await this.leaveModel.find({status:'APPROVED', checked:true}).populate('typeOfLeave', {leaveType:1}).populate('appliedBy', {firstName:1, lastName:1}).sort({createdAt:-1});
        let almostOver = [];
        leaves.forEach( async (leave) => {
            let difference = new Date(leave.endDate).getTime() - new Date(Date.now()).getTime();
            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
            if(TotalDays <= 2){
                almostOver.push(leave);
            }
        })
        return almostOver;
    }

    async upcomingLeaveRequest(){
        return await this.leaveModel.find({status:'APPROVED', checked:false}).populate('typeOfLeave', {leaveType:1}).populate('appliedBy', {firstName:1,lastName:1}).sort({createdAt:-1});
    }

    async loggedInUsersUpcomingLeaves(id){
        return await this.leaveModel.find({appliedBy:`${id}`, status:'APPROVED'}).populate('typeOfLeave', {leaveType:1}).sort({createdAt:-1})
    }

    async findSingleUpcomingLeave(userId, leaveId){
        return await this.leaveModel.findById(leaveId);
    }

    async pendingUsersLeaves(id){
        return await this.leaveModel.find({appliedBy:`${id}`, status:'PENDING'}).populate('typeOfLeave', {leaveType:1}).sort({createdAt:-1})
    }

    async getWeekendNHolidayCountBetweenDates(startDate, endDate){
        var totalWeekends = 0;
        let holidays = await this.getAllHolidays();
        holidays.forEach( async holiday => {
            if(startDate < new Date(holiday.startDate) && endDate > new Date(holiday.endDate)){
                let numOfDaysBetweenHoliday = await this.getDifferenceInDays(holiday.endDate, holiday.startDate);
                totalWeekends += numOfDaysBetweenHoliday;
            }            
        }) 

        let publicHolidays =  await this.publicHolidayService.getAllPublicHolidays();
        publicHolidays.forEach(holiday => {
            let holidayD = new Date(holiday.date);
            if(startDate < holidayD && endDate > holidayD){
                totalWeekends += 1
            }
        });

        for (var i = startDate; i <= endDate; i.setDate(i.getDate()+1)){
           if (i.getDay() == 0 || i.getDay() == 6) totalWeekends++;
        }
        return totalWeekends;
    }

    async updateDepartmentsRecords(leave){
        const userRecord = await this.userService.findSingleUser(leave.appliedBy);
        const id = mongoose.Types.ObjectId(userRecord.department);
        const usersDepartment = await this.departmentService.findOne(id);
        usersDepartment.department.numOfEmployeesOnLeave =+ 1;
        // usersDepartment.department.activeEmployees -= 1;
        usersDepartment.department.save()
    }

    async getUserLeavesByLeaveType(userId){
        const leaveTypes = await this.leaveTypeService.getLeaveTypes();
        const loggedInUserLeaves = await this.getLeaves(userId);
        type leaveTypeCast = {
                    _id:string,
                    leaveType:string
                }

        let obj = {};
        let leavesByType = [];
        
        for(let i = 0; i < leaveTypes.length; i++){
            let total = 0;
            let numOfLeavesByType = loggedInUserLeaves.filter(item => {
                let leaveCast = item.typeOfLeave as unknown as leaveTypeCast;
                if(leaveCast.leaveType === leaveTypes[i].leaveType){
                    total = total + item.requested;
                }
                return leaveCast.leaveType === leaveTypes[i].leaveType;
            })
            obj[leaveTypes[i].leaveType] = leaveTypes[i].numberOfDays - total;
            leavesByType.push(obj);
        }
        
        return leavesByType[0]
    }

    async leaveSummaryReportsForUser(userId){
        const userLeaves = await this.leaveModel.find({appliedBy:`${userId}`});
        const user = await this.userService.findSingleUser(userId);
        let leavesConsumed = null;
        leavesConsumed = userLeaves.filter((leave) => leave.checked == true)
                               .map(item => item.requested)
                               .reduce((prev, next) => prev + next, 0);

        const leaveTypes = await this.leaveTypeService.getLeaveTypes();
        let sumOfLeavesDays = 0;
        for(let i = 0; i < leaveTypes.length; i++){
            sumOfLeavesDays += leaveTypes[i].numberOfDays;
        }

        let leaveBalance = null;

        if(typeof sumOfLeavesDays != null || undefined){
            const leaveDays = sumOfLeavesDays? sumOfLeavesDays : 0;
            leaveBalance = leaveDays - leavesConsumed;
        }

        let carryOverDays = null;
        let employeeStartToDate = null;

        if(user.startDate){
            employeeStartToDate = await this.getAge(user.startDate);
            if(employeeStartToDate >= 1 && leavesConsumed <= sumOfLeavesDays){
                let daysToCarryOver = sumOfLeavesDays - leavesConsumed;
                if( daysToCarryOver > sumOfLeavesDays){
                    carryOverDays = sumOfLeavesDays;
                } else {
                    carryOverDays = sumOfLeavesDays - leavesConsumed;
                }
            }                    
        }

        return {
            leavesConsumed:leavesConsumed,
            leaveBalance:leaveBalance,
            yearsToDate:employeeStartToDate,
            carryOverDays:carryOverDays
        }
    }

    async deleteAllLeaves(){
        return await this.leaveModel.deleteMany({});
    }

    async findAllCancelledLeaves(){
        return await this.leaveModel.find({status:'CANCELLED'}).sort({createdAt:-1});
    }

    async findAllApprovedLeaves(){
        return await this.leaveModel.find({status:'APPROVED'}).populate('typeOfLeave', {leaveType:1}).sort({createdAt:-1});
    }

    async getAge(dateString){
        var today = new Date();
        var birthDate = new Date(dateString);

        let age = 0;
        if(today < birthDate) return age;
        age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    }

    async leaveFilter(leaveType:string){
        let leaveByFilteredType = await this.leaveModel.find({})
    }
}