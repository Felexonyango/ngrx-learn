import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "bson";
import { SibasiResponse } from "src/customs/response";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { Roles } from "src/user/models/user.schema";
import { LeaveType } from "../models/leaveType.schema";
import { LeaveTypeService } from "../services/leaveType.service";

@Controller('leavetype')
@UseGuards(JwtAuthGuard)
@Role(Roles.SUPERVISOR, Roles.USER, Roles.HUMANRESOURCE, Roles.USERADMIN, Roles.DEPARTMENTHEAD)
@ApiTags('LeaveType')
export class LeaveTypeController {
    constructor(private leaveTypeService:LeaveTypeService){}

    @Get()
    async getLeaveTypes(){
        return new SibasiResponse('Successfully fetched leave types', await this.leaveTypeService.getLeaveTypes());
    }

    @Get('/:id')
    async getLeaveTypeById(@Param('id') id:ObjectId) {
        return new SibasiResponse('Successfully fetched single leavetype by Id', await this.leaveTypeService.getLeaveTypeById(id))
    }

    @Post()
    async postLeaveType(@Body() data:LeaveType){
        return new SibasiResponse('Successfully added leave type', await this.leaveTypeService.postLeaveType(data));
    }

    @Post('deleteLeaveTypes')
    async deleteAllLeaveTypes(){
        return new SibasiResponse('Deleted all leave types successfully', await this.leaveTypeService.deleteAllLeaveTypes());
    }

    @Post('/:id')
    async updateLeaveType(@Param('id') id:ObjectId, @Body() data:LeaveType){
        return new SibasiResponse('Successfully updated leave type', await this.leaveTypeService.updateLeaveType(id,data))
    }

    @Delete('/:leaveTypeId')
    async deleteLeaveType(@Param('leaveTypeId') leaveTypeId:ObjectId){
        return new SibasiResponse('Successfully deleted leave type', await this.leaveTypeService.deleteLeaveType(leaveTypeId));
    }

}