import { Controller,Post,Delete,Get,Body,Param,Patch, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { TestResponse } from "src/customs/response";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { Roles } from "src/user/models/user.schema";
// import { RolesRequired } from "src/users/Auth/role.decorator";
// import { Roles } from "src/users/Models/users.dto";
import { NhifTier } from "../models/nhif.schema";
import { NhifTierService } from "../services/nhif.service";


@Controller('nhif')
@ApiTags('Nhif')
@Role(Roles.SUPERVISOR)
@UseGuards(JwtAuthGuard)
export class NhifTierController {
  constructor(private readonly nhifTierService:NhifTierService) {}

  @Post()
  async create(@Body() tier:NhifTier){
    return new TestResponse("Created nhif tier record", await this.nhifTierService.create(tier));
    }


  @Get()
  async findAll() {
    return new TestResponse("Fetched all nhif tier records", await this.nhifTierService.findAll());
  }

  @Get(':id')
  async findOne (@Param('id') id:ObjectId){
    return new TestResponse("Fetched single nhif tier record", await this.nhifTierService.findOne(id));
  }
  
  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() data:NhifTier) {
    return new TestResponse("Updated nhif tier record successfully", await this.nhifTierService.update(id, data));
  } 


   @Delete(':id')
    async delete(@Param('id') id:ObjectId){
      return new TestResponse("Deleted nhif tier record", await this.nhifTierService.delete(id));
    }

}