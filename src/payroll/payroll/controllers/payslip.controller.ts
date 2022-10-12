/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller,Post,Delete,Get,Body,Param,Patch, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { TestResponse } from "src/customs/response";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { RolesGuard } from "src/user/auth/roles.guard";
import { getUser } from "src/user/auth/user.decorator";
import { Roles } from "src/user/models/user.schema";
// import { RolesRequired } from "src/users/Auth/role.decorator";
// import { Roles } from "src/users/Models/users.dto";
import { PayrollDto } from "../models/payroll.dto";
import { PaySlipService } from "../services/payslip.service";

@Controller('payslip')
@UseGuards(JwtAuthGuard)
@ApiTags('Payslip')
export class PaySlipController {
  constructor(private readonly paySlipService:PaySlipService) {}

  @Get()
  async getAllPaySlips(@getUser() user){  
    return new TestResponse("All Payslips Fetched", await this.paySlipService.findAllpaySlips(user.userId));
  }

  
  @Get('onepayslip/:payslipID')
  async getOnePaySlip(@getUser() user,@Param('payslipID')payslipID:ObjectId){
    return new TestResponse("Month Payslip Fetched", await this.paySlipService.findOnePaySlip(user.userId,payslipID));
  }

/*  @Post()
  async create(@Body() PayrollDto:PayrollDto){
    return this.payRollService.create(PayrollDto);        
    }


  @Get()
  async findAll() {
    return this.payRollService.findAll();
  }

  @Get(':id')
  async findOne (@Param('id') id:ObjectId){
    return this.payRollService.findOne(id);
  }
  
  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() data:PayrollDto) {
    return await this.payRollService.update(id, data);
  } 


   @Delete(':id')
    async delete(@Param('id') id:ObjectId){
      return this.payRollService.delete(id);
    }*/

    @Get(':id')
    @Role(Roles.SUPERVISOR)
    async generatePaySlip(@Param('id') userID:ObjectId){
      return new TestResponse("User's Payslip Generated", await this.paySlipService.generatePaySlipForMonth(userID));
    }

}