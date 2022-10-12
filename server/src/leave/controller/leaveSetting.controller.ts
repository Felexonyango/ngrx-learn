import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "bson";
import { TestResponse } from "src/customs/response";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { Roles } from "src/user/models/user.schema";
import { LeaveSetting, LeaveSettingDTO } from "../models/leaveSettings.model";
import { LeaveSettingService } from "../services/leaveSetting.service";

@Controller('leaveSetting')
@UseGuards(JwtAuthGuard)
@Role(Roles.SUPERVISOR, Roles.HUMANRESOURCE)
@ApiTags('LeaveSetting')
export class LeaveSettingController {

    constructor(private leaveSettingService:LeaveSettingService){}

    @Get()
    async getLeaveSettings(){
        return new TestResponse('Fetched leave settings', await this.leaveSettingService.getLeaveSetting());
    }

    @Post()
    async postLeaveSettings(@Body() data:LeaveSettingDTO){
        return new TestResponse('Succesfully added leave settings', await this.leaveSettingService.createLeaveSetting(data));
    }

    @Post('/:id')
    async updateLeaveSettings(@Body() data:LeaveSettingDTO, @Param('id') id:ObjectId){
        return new TestResponse('Successfully updated leave settings', await this.leaveSettingService.updateLeaveSetting(id, data));
    }

    @Delete('/:id')
    async deleteLeaveSettings(@Param('id') id:ObjectId){
        return new TestResponse('Successfully deleted leave settings', await this.leaveSettingService.deleteLeaveSetting(id));
    }
}