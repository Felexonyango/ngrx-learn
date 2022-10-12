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
import { Department, DepartmentDTO } from "../models/department.schema";
import { DepartmentService } from "../services/department.service";


@Controller('department')
@Role(Roles.SUPERVISOR)
@UseGuards(JwtAuthGuard)
@ApiTags('Department')
export class DepartmentController {
  constructor(private readonly departmentService:DepartmentService) {}

  @Post()
  async create(@Body() data:DepartmentDTO){
    return new TestResponse('Created department successfully', await this.departmentService.create(data));        
  }
 
  @Get()
  async findAll() {
    return new TestResponse('Fetched all departments', await this.departmentService.findAll());
  }

  @Get(':id')
  async findOne (@Param('id') id:ObjectId){
    return new TestResponse('Fetched a single department', await this.departmentService.findOne(id));
  }
  
  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() data:DepartmentDTO) {
    return new TestResponse('Updated department successfully', await this.departmentService.update(id, data));
  } 


  @Delete(':id')
  async delete(@Param('id') id:ObjectId){
    return new TestResponse('Deleted department successfully', await this.departmentService.delete(id));
  }

}