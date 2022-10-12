/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller,Post,Delete,Get,Body,Param,Patch, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { SibasiResponse } from "src/customs/response";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { getUser } from "src/user/auth/user.decorator";
import { Roles } from "src/user/models/user.schema";
import { PayRoll, PayRollDTO, Status } from "../models/payroll.schema";
import { PayrollService } from "../services/payroll.service";
// import { RolesRequired } from "src/users/Auth/role.decorator";
// import { Roles } from "src/users/Models/users.dto";

@Controller('payroll')
@ApiTags('Payroll')
@Role(Roles.SUPERVISOR)
@UseGuards(JwtAuthGuard)
export class PayRollController {
  constructor(private readonly payrollService:PayrollService) {}

  @Post()
  async create(@Body() data:PayRoll){
    data.status= Status.OPEN;
    return new SibasiResponse("Created payroll record", await this.payrollService.create(data));
    }


  @Get()
  async findAll() {
    return new SibasiResponse("Fetched all payroll records", await this.payrollService.findAll());
  }

  @Get(':id')
  async findOne (@Param('id') id:ObjectId){
    return new SibasiResponse("Fetched single payroll record", await this.payrollService.findOne(id));
  }
  
  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() data:PayRoll,@getUser()user) {
    return new SibasiResponse("Updated payroll record successfully", await this.payrollService.update(id, data,user));
  } 


   @Delete(':id')
    async delete(@Param('id') id:ObjectId){
      return new SibasiResponse("Deleted payroll record", await this.payrollService.delete(id));
    }

}