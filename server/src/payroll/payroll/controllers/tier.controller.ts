import { Controller,Post,Delete,Get,Body,Param,Patch, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { TestResponse } from "src/customs/response";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { Roles } from "src/user/models/user.schema";
import { Tier } from "../models/tier.schema";
import { TierService } from "../services/tier.service";

@Controller('tier')
@ApiTags('Tier')
@Role(Roles.SUPERVISOR)
@UseGuards(JwtAuthGuard)
export class TierController {
  constructor(private readonly tierService:TierService) {}

  @Post()
  async create(@Body() tier:Tier){
    return new TestResponse("Created custom tier record", await this.tierService.create(tier));      
    }


  @Get()
  async findAll() {
    return new TestResponse("Fetched all custom tier record", await this.tierService.findAll());
  }

  @Get(':id')
  async findOne (@Param('id') id:ObjectId){
    return new TestResponse("Fetched one custom tier record", await this.tierService.findOne(id));
  }
  
  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() data:Tier) {
    return new TestResponse("Updated custom tier record successfully", await this.tierService.update(id, data));
  } 


   @Delete(':id')
    async delete(@Param('id') id:ObjectId){
      return new TestResponse("Deleted custom tier record", await this.tierService.delete(id));
    }

}