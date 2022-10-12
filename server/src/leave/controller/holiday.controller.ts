import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "bson";
import { TestResponse } from "src/customs/response";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { getUser } from "src/user/auth/user.decorator";
import { Roles } from "src/user/models/user.schema";
import { Holiday, HolidayDTO } from "../models/holiday.schema";
import { HolidayService } from "../services/holiday.service";

@Controller('holiday')
@UseGuards(JwtAuthGuard)
@Role(Roles.SUPERVISOR, Roles.HUMANRESOURCE)
@ApiTags('Holiday')
export class HolidayController {
    constructor(private holidayService:HolidayService){}
    
    @Get()
    async getHolidays(){
        return new TestResponse('Fetched Holiday records', await this.holidayService.findAllHolidays());
    }

    @Get(':id')
    async getHolidayById(@Param('id') id:ObjectId){
        return new TestResponse("Fetched single holiday by id", await this.holidayService.findSingleHoliday(id));
    }

    @Post()
    async postHolidayLeave(@Body() data:HolidayDTO, @getUser() user){   
      return new TestResponse('Successfully added Holiday', await this.holidayService.createHoliday(data, user.userId));
    }

    @Post('deleteall')
    async deleteAllHolidays(){
        return new TestResponse('Deleted all holiday successfully', await this.holidayService.deleteAll());
    }

    @Post('/:id')
    async updateHolidayLeave(@Body() data:HolidayDTO, @getUser() user, @Param('id') id:ObjectId){
        return new TestResponse('Successfully updated Holiday', await this.holidayService.updateHoliday(id,data,user));
    }

    @Delete('/:id')
    async deleteHolidayLeave(@Param('id') id:ObjectId){
        return new TestResponse('Successfully deleted Holiday', await this.holidayService.deleteHoliday(id));
    }

    
}