import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { SibasiResponse } from 'src/customs/response';
import { FileUploadService } from 'src/fileUpload/services/fileUpload.services';
import { PayrollService } from 'src/payroll/payroll/services/payroll.service';
import { JwtAuthGuard } from 'src/user/auth/auth.guard';
import { Role } from 'src/user/auth/role.decorator';
import { getUser } from 'src/user/auth/user.decorator';
import { Roles } from 'src/user/models/user.schema';
import { LeaveDTO, Status } from '../models/leave.schema';
import { HolidayService } from '../services/holiday.service';
import { LeaveService } from '../services/leave.service';
import { LeaveSettingService } from '../services/leaveSetting.service';
import { LeaveTypeService } from '../services/leaveType.service';

@Controller('supervisor')
@UseGuards(JwtAuthGuard)
@Role(Roles.SUPERVISOR, Roles.HUMANRESOURCE, Roles.USERADMIN, Roles.DEPARTMENTHEAD)
@ApiTags('supervisor')
export class SupervisorController {
  constructor(
    private leaveService: LeaveService,
    private uploadsService: FileUploadService,
    private payrollService: PayrollService,
    private holidayService: HolidayService,
    private leaveTypeService: LeaveTypeService,
    private leaveSettingService: LeaveSettingService,
  ) {}

  @Get()
  async getAllUsersLeaveRequest(@getUser() user) {
    console.log(user);
    return new SibasiResponse(
      'Successfully fetched all user leave request',
      await this.leaveService.getAllLeavesApplied(user.userId),
    );
  }

  @Get('/allleaves')
  async getAllUserLeaves(){
    return new SibasiResponse('Fetched all user leaves successfully', await this.leaveService.getAllLeaves());
  }

  @Get('/usersummary/:id')
  async getUserLeaveSummary(@Param('id') id: ObjectId) {
    return new SibasiResponse(
      'User leave summary successfully fetched',
      await this.leaveService.leaveSummaryReportsForUser(id),
    );
  }

  @Get('/leaves/ending')
  async getLeavesEndingSoon() {
    return new SibasiResponse(
      'Fetched leaves ending soon',
      await this.leaveService.leaveAlmostOver(),
    );
  }

  @Get('/leaves/upcoming')
  async upcomingLeaveRequest() {
    return new SibasiResponse(
      'Fetched upcoming leaves',
      await this.leaveService.upcomingLeaveRequest(),
    );
  }

  @Get('/leaves/cancelled')
  async cancelledLeaves() {
    return new SibasiResponse(
      'Cancelled leaves successfully fetched',
      await this.leaveService.findAllCancelledLeaves(),
    );
  }

  @Get('/leaves/approved')
  async approvedLeaves() {
    return new SibasiResponse(
      'Approved leaves successfully fetched',
      await this.leaveService.findAllApprovedLeaves(),
    );
  }

  @Get('/leaves/department')
  async allDepartmentLeaveHistory(@getUser() user){
    return new SibasiResponse('Leave history for department successfully fetched', await this.leaveService.getAllLeavesAppliedInDepartment(user.userId));
  }

  @Get('/alldepartments')
  async getLeavesForAllDepartments() {
    return new SibasiResponse('All departments leaves successfully fetched', await this.leaveService.getAllLeavesForSupervisor());
  }

  @Get('/:id')
  async getSingleUsersLeaveRequest(@Param('id') id: ObjectId) {
    return new SibasiResponse(
      'Successfully fetched single user leave request',
      await this.leaveService.getLeaves(id),
    );
  }

  @Get('/:userId/:leaveId')
  async getUsersLeaveFile(
    @Param('userId') userId: ObjectId,
    @Param('leaveId') leaveId: string,
    @Res() res,
  ) {
    return new SibasiResponse(
      'Successfully fetched user leave attached file',
      await this.uploadsService.findFile(leaveId, res, userId),
    );
  }

  @Post('payroll/:payrollId')
  async approvePayRoll(@Param('payrollId') payrollId: ObjectId) {
    return new SibasiResponse(
      'Successfully aproved payroll batch',
      await this.payrollService.changePayRollStatus(payrollId),
    );
  }

  @Post('leave/:userId')
  async createUserLeave(@Param('userId') userId:ObjectId, @Body() data:LeaveDTO){
      data.appliedBy = userId;
      data.status = Status.PENDING;
    return new SibasiResponse('Successfully created leave request for a user', await this.leaveService.postLeave(data, userId));
  }

  @Post('holidays/deleteAll')
  async deleteAllHolidays() {
    return new SibasiResponse(
      'Deleted all holidays successfully',
      await this.holidayService.deleteAll(),
    );
  }

  @Post('leaves/deleteall')
  async deleteAllLeaves() {
    return new SibasiResponse(
      'Deleted all leaves successfully',
      await this.leaveService.deleteAllLeaves(),
    );
  }

  @Post('leavesettings/deleteall')
  async deleteAllLeaveSettings() {
    return new SibasiResponse(
      'Deleted all leave settings successfully', await this.leaveSettingService.deleteAllLeaveSetting());
  }

  @Post('leavetypes/deleteall')
  async deleteAllLeaveTypes() {
    return new SibasiResponse(
      'Deleted all leave types successfully', 
      await this.leaveTypeService.deleteAllLeaveTypes());
  }

  @Post('approveleave/:id')
  async approveLeave(@Param('id') id: ObjectId, @getUser() user) {
    return new SibasiResponse('Approved leave status successfully', await this.leaveService.approveLeaveStatus(id, user.userId));
  }

  @Post('cancelleave/:id')
  async cancelLeave(@Param('id') id: ObjectId, @getUser() user) {
    return new SibasiResponse('Cancelled leave status successfully', await this.leaveService.cancelLeaveStatus(id, user.userId));
  }
}
