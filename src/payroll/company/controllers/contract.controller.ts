import { Controller,Post,Delete,Get,Body,Param,Patch, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { TestResponse } from "src/customs/response";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { Roles } from "src/user/models/user.schema";
import { Contract, Status } from "../models/contract.schema";
import { ContractService } from "../services/contract.service";



@Controller('contract')
@Role(Roles.SUPERVISOR)
@UseGuards(JwtAuthGuard)
@ApiTags('Contract')
export class ContractController {
  constructor(private readonly contractService:ContractService) {}

  @Post()
  async create(@Body() data:Contract){
    data.status= Status.VALID;
    return new TestResponse('Created contract successully', await this.contractService.create(data));        
    }
 
  @Get()
  async findAll() {
    return new TestResponse('Fetched all contracts', await this.contractService.findAll());
  }

  @Get(':id')
  async findOne (@Param('id') id:ObjectId){
    return new TestResponse('Fetched single contract', await this.contractService.findOne(id));
  }
  
  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() data:Contract) {
    return new TestResponse('Updated contract', await this.contractService.update(id, data));
  } 


   @Delete(':id')
    async delete(@Param('id') id:ObjectId){
      return new TestResponse('Deleted contract', await this.contractService.delete(id));
    }

}