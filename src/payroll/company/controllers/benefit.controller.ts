import { Controller,Post,Delete,Get,Body,Param,Patch, UseInterceptors, UploadedFile, UseGuards} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { TestResponse } from "src/customs/response";
import { upload } from "src/fileUpload/config/gridfs.config";
import { FileUploadService } from "src/fileUpload/services/fileUpload.services";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { Roles } from "src/user/models/user.schema";

import { Benefits } from "../models/benefit.schema";
import { Department } from "../models/department.schema";
import { BenefitService } from "../services/benefit.service";

@Controller('benefit')
@Role(Roles.SUPERVISOR)
@ApiTags('Benefits')
@UseGuards(JwtAuthGuard)
export class BenefitController {
  constructor(private readonly benefitService:BenefitService) {}

  @Post()
  async create(@Body() data:Benefits){
    return new TestResponse("Created benefits record", await this.benefitService.create(data));        
    }
 
  @Get()
  async findAll() {
    return new TestResponse("Fetched all benefits records", await this.benefitService.findAll());
  }

  @Get(':id')
  async findOne (@Param('id') id:ObjectId){
    return new TestResponse("Fetched single benefits record", await this.benefitService.findOne(id));
  }
  
  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() data:Benefits) {
    return new TestResponse("Updated benefits record successfully", await this.benefitService.update(id, data));
  } 


   @Delete(':id')
    async delete(@Param('id') id:ObjectId){
      return new TestResponse("Deleted benefits record", await this.benefitService.delete(id));
    }

}