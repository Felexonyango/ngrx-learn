import { HttpException, HttpStatus, Injectable, OnModuleInit } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Cron, CronExpression } from "@nestjs/schedule"
import { ObjectId } from "bson"
import { Model } from "mongoose"
import { defaultMenuData } from "src/menu/model/Menu.data"
import { Menu } from "src/menu/model/Menu.model"
import { MenuService } from "src/menu/services/menu.service"
import { DepartmentService } from "src/payroll/company/services/department.service"
import { Roles, User } from "../models/user.schema"
import { AuthService } from "./auth.service"

@Injectable()
export class UserService implements OnModuleInit{

    constructor(
        @InjectModel(User.name) private userModel:Model<User>,
        private authService:AuthService,
        private departmentService:DepartmentService
        ){}

    async onModuleInit() {
        await this.authService.checkAdminExists()
    }
    
    async findSingleUser(id) {
        return await this.userModel.findById(id, {password:0}).populate('department', { departmentName:1 });
    }
    
    async getUsers(){
        let users = await this.userModel.find({}, {password:0}).populate('department', { departmentName:1 });
        return users.filter((item) => item.email !== 'supervisor@gmail.com'); 
    }

    async updateUser(id, data:User){
        if(data.department){
            let department = await this.departmentService.findOne(data.department);
            department.department.activeEmployees += 1;
        }
        return await this.userModel.findByIdAndUpdate(id, data, {new:true}).populate('department', { departmentName:1 });
    }

    async deleteUser(id){
        return await this.userModel.findByIdAndDelete(id).populate('department', { departmentName:1 });
    }

    async getNumberOfUsersInDepartment(){
        let users = await this.getUsers();
        let departments = await this.departmentService.findAll();
        const numOfUser = [];
        for(let i = 0; i < departments.length; i++){
            let usersInDepartment = users.filter(user => {
                String(user.department) == departments[i].id;
            }).length;
            let obj = {}
            obj[departments[i].departmentName] = usersInDepartment;
            numOfUser.push(obj);
        }
        return numOfUser;
    }

    async changeUserRoles(id, data){
        let user = await this.findSingleUser(id);
        if(!user.role.includes(data.role)){
            user.role.push(data.role);
        }

        return await user.save();
    }

    async removeUserRoles(id,data){
        let user = await this.findSingleUser(id);
        if(user.role.includes(data.role)){
            let newUserRole = user.role.filter(role => role != data.role);
            user.role = newUserRole;
        }
        return await user.save()
    }

    async userSummaryDetails(){
        const allUsers = await this.getUsers();
        const findUserOnLeave = allUsers.filter(user => user.status === false).length;
        let totalUsers = allUsers.length;
        let usersInOffice = totalUsers - findUserOnLeave;
        return {
            labels:['OnLeave','usersInOffice'],
            datasets:[
                {
                    data:[findUserOnLeave,usersInOffice]
                }
            ]
        }
        
    }

    async findUsersInACertainDepartment(id){
        let department = await this.departmentService.findOne(id);
        let usersInDepartment = await this.userModel.find({department:id, role:{$all:['USER']}});
        return {
            department:usersInDepartment
        }
    }

    async findUser(options){
        return await this.userModel.find(options);
    }
}