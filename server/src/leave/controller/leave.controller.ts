/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { upload } from "src/fileUpload/config/gridfs.config";
import { FileUploadService } from "src/fileUpload/services/fileUpload.services";
import { Leave, LeaveDTO, Status } from "../models/leave.schema";
import { SibasiResponse } from "src/customs/response";
import { LeaveService } from "../services/leave.service";
import { Roles } from "src/user/models/user.schema";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { getUser } from "src/user/auth/user.decorator";
import { ObjectId } from "bson";


@Controller('leave')
@UseGuards(JwtAuthGuard)
@Role(Roles.SUPERVISOR, Roles.USER, Roles.HUMANRESOURCE, Roles.USERADMIN)
@ApiTags('Leave')
export class LeaveController {

   constructor(
      private leaveService:LeaveService,
      private uploadsService:FileUploadService
      ){}

   @Get('')
   async getLeaves(@getUser() user){
      return new SibasiResponse('Successfully fetched user leave profile', await this.leaveService.getLeaves(user.userId));
   }

   @Get('/upcoming')
   async getUpcomingLeaves(@getUser() user){
      return new SibasiResponse('Upcoming leaves successfully fetched', await this.leaveService.loggedInUsersUpcomingLeaves(user.userId));
   } 

   @Get('/upcoming/:leaveId')
   async getSingleUpcomingLeave(@getUser() user, @Param('leaveId') leaveId:ObjectId){
      return new SibasiResponse('Single upcoming leave successfully fetched', await this.leaveService.findSingleUpcomingLeave(user.userId, leaveId));
   }

   @Get('/pending')
   async pendingLeaves(@getUser() user){
      return new SibasiResponse('Pending user leaves successfully fetched', await this.leaveService.pendingUsersLeaves(user.userId));
   }

   @Get('/publicholidays')
   async getPublicHolidays(){
      return new SibasiResponse('Public holidays successfully fetched', await this.leaveService.getPublicHolidays());
   }

   @Get('/leaveTypes')
   async userLeaveTypes(@getUser() user){
      return new SibasiResponse('Leaves per leavetype successfully fetched', await this.leaveService.getUserLeavesByLeaveType(user.userId));
   }

   @Get('/summary')
   async getLeaveSummary(@getUser() user){
      return new SibasiResponse('Summary of leaves successfully fetched', await this.leaveService.leaveSummaryReportsForUser(user.userId));
   }

   @Get('/:id')
   async getSingleLeave(@Param('id') id:ObjectId){
      return new SibasiResponse('Successfully fetched single leave details', await this.leaveService.getSingleLeave(id));
   }

   @Get('/file/:leaveId')
   async getLeaveAttachedFile(@Param('leaveId') leaveId:ObjectId, @Res() res, @getUser() user){
      return new SibasiResponse('Successfully fetched leave file', await this.uploadsService.findFile(leaveId, res, user.userId));
   }

   @Post('')
   @UseInterceptors(FileInterceptor('file'))
   async postLeave(@UploadedFile() file, @Body() data:LeaveDTO, @getUser() user){
      upload.single('file');
      data.appliedBy = user.userId;
      data.status = Status.PENDING;
      const leave = await this.leaveService.postLeave(data, user.userId)
      if(file) await this.uploadsService.uploadFile(leave[0]._id, file, user);
      return new SibasiResponse('Successfully added leave details', leave);
   }

   @Post('deleteLeaves')
   async deleteAllLeave(){
      return new SibasiResponse('Deleted all leaves successfully', await this.leaveService.deleteAllLeaves());
   } 

   @Post('/:id')
   async updateLeave(@Param('id') id:ObjectId, @Body() data:Partial<Leave>, @getUser() user) {
      return new SibasiResponse('Successfully updated leave details', await this.leaveService.updateLeave(id, data, user));
   }

   @Delete('/:id')
   async deleteLeave(@Param('id') id:ObjectId) {
      return new SibasiResponse('Successfully deleted leave details', await this.leaveService.deleteLeave(id));
   }
}