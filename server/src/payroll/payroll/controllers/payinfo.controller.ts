/* eslint-disable prettier/prettier */
import { Controller,Post,Delete,Get,Body,Param,Patch, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { SibasiResponse } from "src/customs/response";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { getUser } from "src/user/auth/user.decorator";
import { Roles } from "src/user/models/user.schema";
import { PayInfo } from "../models/payinfo.schema";
import { PayRoll, Status } from "../models/payroll.schema";
import { PayInfoService } from "../services/payinfo.service";
// import { RolesRequired } from "src/users/Auth/role.decorator";
// import { Roles } from "src/users/Models/users.dto";

@Controller('payinfo')
@ApiTags('PayInfo')
@UseGuards(JwtAuthGuard)
@Role(Roles.SUPERVISOR)
export class PayInfoController {
  constructor(private readonly payinfoService:PayInfoService) {}

  @Post()
  async create(@Body() data:PayInfo){
    return new SibasiResponse("Created payment record", await this.payinfoService.create(data));
    }


  @Get()
  async findAll() {
    return new SibasiResponse("Fetched all payment records", await this.payinfoService.findAll());
  }

  @Get(':id')
  async findOne (@Param('id') id:ObjectId){
    return new SibasiResponse("Fetched single payment record", await this.payinfoService.findOne(id));
  }
  
  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() data:PayInfo,@getUser()user) {
    return new SibasiResponse("Updated payment record successfully", await this.payinfoService.update(id, data,user));
  } 


   @Delete(':id')
    async delete(@Param('id') id:ObjectId){
      return new SibasiResponse("Deleted payment record", await this.payinfoService.delete(id));
    }

}