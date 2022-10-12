import { Controller,Post,Delete,Get,Body,Param,Patch, UseInterceptors, UploadedFile, UseGuards} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { SibasiResponse } from "src/customs/response";
import { upload } from "src/fileUpload/config/gridfs.config";
import { FileUploadService } from "src/fileUpload/services/fileUpload.services";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { getUser } from "src/user/auth/user.decorator";
import { Roles } from "src/user/models/user.schema";
import { Company } from "../models/company.schema";
import { CompanyService } from "../services/company.service";


@Controller('company')
@Role(Roles.SUPERVISOR)
@ApiTags('Company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService:CompanyService,private uploadsService:FileUploadService) {}

  @Post()
  async create(@Body() company:Company){
    return new SibasiResponse('Created company successfully', await this.companyService.create(company));        
    }

  @Post('logo/:companyId')
  @UseInterceptors(FileInterceptor('file'))
  async postLogo(@UploadedFile() file, @Param() companyId:ObjectId,@getUser() user){
    upload.single('file');
    return new SibasiResponse('', await this.uploadsService.uploadFile(companyId,file,user));
  }
 
  @Get()
  async findAll() {
    return new SibasiResponse("Fetched all company records", await this.companyService.findAll());
  }

  @Get(':id')
  async findOne (@Param('id') id:ObjectId){
    return new SibasiResponse('Fetched records for a single company', await this.companyService.findOne(id));
  }
  
  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() data:Company) {
    return new SibasiResponse('Updated record for a company', await this.companyService.update(id, data));
  } 


   @Delete(':id')
    async delete(@Param('id') id:ObjectId){
      return new SibasiResponse('Deleted company records successfully', await this.companyService.delete(id));
    }

}