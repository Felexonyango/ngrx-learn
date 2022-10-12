import { Controller,Post,Delete,Get,Body,Param,Patch, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { TestResponse } from "src/customs/response";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { Roles } from "src/user/models/user.schema";
import { Contract } from "../models/contract.schema";
import { EmployeeType } from "../models/employeetype.schema";
import { EmployeeTypeService } from "../services/employeetype.service";


@Controller('employeetype')
@Role(Roles.SUPERVISOR, Roles.HUMANRESOURCE, Roles.USER, Roles.USERADMIN)
@UseGuards(JwtAuthGuard)
@ApiTags('employeetype')
export class EmployeeTypeController {
  constructor(private readonly employeetypeService:EmployeeTypeService) {}

  @Post()
  @Role(Roles.SUPERVISOR, Roles.HUMANRESOURCE, Roles.USERADMIN)
  async create(@Body() data:EmployeeType){
    return new TestResponse('Created employee type successully', await this.employeetypeService.create(data));        
    }
 
  @Get()
  async findAll() {
    return new TestResponse('Fetched all employee types', await this.employeetypeService.findAll());
  }

  @Get(':id')
  async findOne (@Param('id') id:ObjectId){
    return new TestResponse('Fetched single employee type', await this.employeetypeService.findOne(id));
  }
  
  @Patch(':id')
  @Role(Roles.SUPERVISOR, Roles.HUMANRESOURCE, Roles.USERADMIN)
  async update(@Param('id') id: ObjectId, @Body() data:EmployeeType) {
    return new TestResponse('Updated employee type', await this.employeetypeService.update(id, data));
  } 


  @Role(Roles.SUPERVISOR, Roles.HUMANRESOURCE, Roles.USERADMIN)
   @Delete(':id')
    async delete(@Param('id') id:ObjectId){
      return new TestResponse('Deleted employee type', await this.employeetypeService.delete(id));
    }

}