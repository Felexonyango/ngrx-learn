import { Controller,Post,Delete,Get,Body,Param,Patch, UseInterceptors, UploadedFile, UseGuards} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { SibasiResponse } from "src/customs/response";
import { upload } from "src/fileUpload/config/gridfs.config";
import { FileUploadService } from "src/fileUpload/services/fileUpload.services";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { Roles } from "src/user/models/user.schema";
import { Deduction } from "../models/deduction.schema";
// import { JwtAuthGuard } from "src/users/Auth/auth.guard";
// import { RolesRequired } from "src/users/Auth/role.decorator";
// import { Roles } from "src/users/Models/users.dto";
import { Department } from "../models/department.schema";
import { DeductionService } from "../services/deduction.service";
import { DepartmentService } from "../services/department.service";


@Controller('deductions')
@Role(Roles.SUPERVISOR)
@ApiTags('Deductions')
@UseGuards(JwtAuthGuard)
export class DeductionController {
  constructor(private readonly deductionService:DeductionService) {}

  @Post()
  async create(@Body() data:Deduction){
    return new SibasiResponse('Created deduction successfully', await this.deductionService.create(data));        
    }
 
  @Get()
  async findAll() {
    return new SibasiResponse('Fetched all deduction records', await this.deductionService.findAll());
  }

  @Get(':id')
  async findOne (@Param('id') id:ObjectId){
    return new SibasiResponse('Fetched records for a single deduction', await this.deductionService.findOne(id));
  }
  
  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() data:Deduction) {
    return new SibasiResponse('Updated deduction successfully', await this.deductionService.update(id, data));
  } 


   @Delete(':id')
    async delete(@Param('id') id:ObjectId){
      return new SibasiResponse('Deleted deduction successfully', await this.deductionService.delete(id));
    }

}