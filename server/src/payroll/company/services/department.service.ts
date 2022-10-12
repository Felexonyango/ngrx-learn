import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { User } from "src/user/models/user.schema";
import { Company } from "../models/company.schema";
import { Department, DepartmentDTO } from "../models/department.schema";

@Injectable()
export class DepartmentService{

    constructor (@InjectModel(Department.name) private departmentModel:Model <Department>,
                 @InjectModel(User.name) private userModel:Model<User>
                ){}
  
    async create(data:DepartmentDTO){
        data.numOfEmployeesOnLeave = 0;
        data.activeEmployees = 0;
        const departmentExists = await this.departmentModel.find();
        departmentExists.forEach((department) => {
          if(department.departmentName.toLowerCase().trim() === data.departmentName.toLowerCase().trim()){
            throw new HttpException('Department already exists', HttpStatus.BAD_REQUEST);
          }
        })
        
        return await this.departmentModel.create(data);
      }
  
    async findAll() {
      return await this.departmentModel.find().populate('head');
    }

    async findDepartmentByHead(userId){
      return await this.departmentModel.findOne({head:userId});
    }
    
    async findOne(id: ObjectId) {
        const department = await this.departmentModel.findById(id).populate('head');
        const users = await this.userModel.find({department:id});
        if(!department){
          throw new NotFoundException('This information cannot be found');
        }else{
          return {
            department,
            users
          };
        }
    }
    
    async delete(id:ObjectId) {
      return await this.departmentModel.findByIdAndRemove(id);
      }
    
    async update(id: ObjectId, data:DepartmentDTO) {
        const departmentInfo = await this.findOne(id);
        if(departmentInfo.department){
          return await this.departmentModel.findByIdAndUpdate(id, data , {new:true}).populate('head');
        } else {
          throw new HttpException(`Department information with id ${id} not updated`, HttpStatus.NOT_FOUND);
        }
    }

}