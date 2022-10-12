import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoginDTO, Roles, User } from "../models/user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { DepartmentService } from "src/payroll/company/services/department.service";
import { Department } from "src/payroll/company/models/department.schema";
import { MailService } from "src/mail/mail.service";
import { LeaveType } from "src/leave/models/leaveType.schema";
var mongoose = require('mongoose');


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel:Model<User>,
        @InjectModel(Department.name) private departmentModel:Model<Department>,
        @InjectModel(LeaveType.name) private leaveTypeModel:Model<LeaveType>,

        private jwtService:JwtService,
        private departmentService:DepartmentService,
        private mailService:MailService
        ){}

    async register(data:User){
        //check if user already exists
        if(await this.checkUserExists(data.email)){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        } else {
            const roleToAssign = data.role ? data.role : Roles.USER;
            data.password = data.firstName;
            let salt = 10;
            const passwordHash = await bcrypt.hash(data.firstName, salt);

            // get 0 of leaves as per the admin settings to assign to user
            // const leaveDays = await this.leaveSettingModel.find();
            const leaveTypes = await this.leaveTypeModel.find();
            let numOfLeaveDays = 0;
            for(let i = 0; i < leaveTypes.length; i++){
                numOfLeaveDays += leaveTypes[i].numberOfDays;
            }

            // let numOfLeaveDays = 0;
            // if(leaveDays.length > 0){
            //     numOfLeaveDays = leaveDays.numberOfLeaveDays;
            // }

            const newUser = {
                firstName:data.firstName,
                lastName:data.lastName,
                email:data.email,
                role:roleToAssign,  
                department:data.department ? data.department : null,
                nextOfKin:data.nextOfKin,
                idNumber:data.idNumber,
                kraPin:data.kraPin,
                bankAccountNumber:data.bankAccountNumber,
                password:passwordHash,
                bankName:data.bankName,
                phoneNumber:data.phoneNumber,
                employeeIdNumber:data.employeeIdNumber,
                startDate:data.startDate,
                status:true,
                taxRegNO:data.taxRegNO,
                swiftCode:data.swiftCode,
                bankCode:data.bankCode,
                branchName:data.branchName
            } 

            if(newUser.department != null){
                var id = mongoose.Types.ObjectId(`${newUser.department}`);
                let department = await this.departmentService.findOne(id);
                
                if(typeof department.department.activeEmployees == 'number'){
                    department.department.activeEmployees = department.department.activeEmployees + 1;
                    await department.department.save()
                } else {
                    department.department.activeEmployees = 1;
                }
            }

            const emailData = {
                to:newUser.email,
                subject:'User successfully added to the system.',
                text:`To login into the HRSYSTEM,use the provided password: ${newUser.firstName}`
            }

            console.log(newUser.firstName);
            await this.mailService.sendMail(emailData);
            return await (await new this.userModel(newUser).save());
        }
    }


    async login(data:LoginDTO){ 
        const userExists = await this.checkUserExists(data.email);
        if(userExists){
            const passwordMatch = await bcrypt.compare(data.password, userExists.password);
            if(passwordMatch) 
            {
                const token = await this.generateToken(userExists);
                const tokenDetails = await this.jwtService.decode(token);
                
                type payload = {
                    id:string,
                    role:string,
                    email:string,
                    iat:number,
                    exp:number
                }

                const { role, id } = tokenDetails as payload;

                return {
                    jwtToken:token,
                    role:role,
                    id:id
                }
            } else {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
            }
            
        } else {
            throw new HttpException('User details not found, try again', HttpStatus.BAD_REQUEST);
        }
    }


    async checkAdminExists(){
        const supervisor = await this.checkUserExists('supervisor@gmail.com');
        if(supervisor){
            return await this.generateToken(supervisor);
        } else {
            const passwordHash = await bcrypt.hash('password', 10);
            const supervisor = {
                firstName:'supervisor',
                lastName:'system',
                name:'supervisor',
                email:'supervisor@gmail.com',
                role:[Roles.SUPERVISOR],
                password:passwordHash,
                department:null,
                startDate:new Date(Date.now()),
                nextOfKin:null,
                idNumber:null,
                kraPin:null,
                bankAccountNumber:null,
                bankName:null,
                phoneNumber:null,
                employeeIdNumber:null,
                status:true
            }

            const newSupervisor = await new this.userModel(supervisor).save();
            const token = await this.generateToken(newSupervisor);
            type payload = {
                id:string,
                role:[string],
                email:string,
                iat:number,
                exp:number
            }
            const tokenDetails = await this.jwtService.decode(token);
            const { role } = tokenDetails as payload;
            return {
                jwtToken:token,
                role:role
            }
        }
    }

    async checkUserExists(email){
        return await this.userModel.findOne({email:email});
    }

    async generateToken(user){
        const payload = { id:user._id, role:user.role, email:user.email };
        return this.jwtService.sign(payload)
    }

    async forgotPassword(userMail){
        const user = await this.userModel.findOne({email:userMail});
        console.log(user);
        if(!user){
            throw new BadRequestException()
        }

        const token = await this.generateToken(user);

        type payload = {
            id:string,
            role:[string],
            email:string,
            iat:number,
            exp:number
        }

        const decodeToken = await this.jwtService.decode(token);

        const { email } = decodeToken as payload;
        const forgotPasswordUrl = `http://20.55.26.165:4000/#/auth/resetPassword?email=${userMail}`;
        const data = {
            to:email,
            subject:'Password Reset',
            text:`
            <h2>Use the link provided to reset password</h2>
            <p>${forgotPasswordUrl}</p>
            `
        }
        await this.mailService.sendMail(data);
        return 'Link to password reset send to provided email'
    }

    async changePassword(body: {password: string, email: string}){
        let user = await this.userModel.findOne({email:body.email});
        if(user){
            user.password = await bcrypt.hash(body.password, 10);
            const data = {
                        to:user.email,
                        subject:'Password Reset Succeeded',
                        text:`
                        Use the provided password to login
                        : ${body.password}
                        `
                    }
            await this.mailService.sendMail(data);
            await user.save();
        }
        else throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
}