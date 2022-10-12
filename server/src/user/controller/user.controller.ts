/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ObjectId } from "bson";
import { Request } from "express";
import { SibasiResponse } from "src/customs/response";
import { upload } from "src/fileUpload/config/gridfs.config";
import { FileUploadService } from "src/fileUpload/services/fileUpload.services";
import { JwtAuthGuard } from "../auth/auth.guard";
import { Role } from "../auth/role.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { getUser } from "../auth/user.decorator";
import { Roles, User } from "../models/user.schema";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Controller('user')
@UseGuards(JwtAuthGuard)
@Role(Roles.SUPERVISOR, Roles.USERADMIN, Roles.HUMANRESOURCE)
@ApiTags('users')
@ApiBearerAuth('jwt')
export class UserController {

   constructor(
      private userService:UserService,
      private authService:AuthService,
      private uploadService:FileUploadService
      ){}

   @Role(Roles.USER)
   @Get()
   async getUserProfile(@getUser() user){
      return new SibasiResponse('Successfully fetched user profile', await this.userService.findSingleUser(user.userId));
   }

   @Get('all')
   async getUsers(){
      return new SibasiResponse('Successfully fetched all user details', await this.userService.getUsers());
   }

   @Get('summary')
   async getUserSummaryDetails(){
      return new SibasiResponse('Summary of users per department successfully fetched', await this.userService.userSummaryDetails());
   }

   @Role(Roles.USER)
   @Get('/userprofile')
   async getLoggedInUserProfile(@getUser() user, @Res() res){
      return new SibasiResponse('Fetched user profile image successfully', await this.uploadService.findUserProfileImg(user.userId, res))
   }

   @Get('/searchuser')
   async searchUser(@Req() req:Request){
      let options = {};
      if(req.query.s){
         options = {
            $or:[
               {firstName: new RegExp(req.query.s.toString()), flags:'i'},
               {lastName: new RegExp(req.query.s.toString()), flags:'i'}
            ]
         }
      }

      return new SibasiResponse('Fetched users mathing provided record', await this.userService.findUser(options));
   }

   @Get(':id')
   async getSingleUser(@Param('id') id:string){
      return new SibasiResponse('Successfully fetched user details', await this.userService.findSingleUser(id));
   }

   @Post()
   async postUser(@Body() data:User){
      console.log(data)
      const userRegister =  await this.authService.register(data);
      return new SibasiResponse('Successfully added user', userRegister);
   }

   @Post('/file/:userId')
   @UseInterceptors(FileInterceptor('file'))
   async postUserImg(@UploadedFile() file, @Param('userId') userId:ObjectId, @getUser() user){
      upload.single('file');
      if(file) await this.uploadService.uploadFile(userId, file, user);
      return new SibasiResponse('Successfully added user image');
   }

   @Post(':id')
   async updateUser(@Param('id') id:string, @Body() data:User) {
      return new SibasiResponse('Successfully updated user details', await this.userService.updateUser(id, data));
   }

   @Role(Roles.SUPERVISOR, Roles.USERADMIN)
   @Post('/role/:userId')
   async updateUserRole(@Param('userId') userId:ObjectId, @Body() data:Object){
      return new SibasiResponse('Successfully changed user role', await this.userService.changeUserRoles(userId, data));
   }

   @Role(Roles.SUPERVISOR, Roles.USERADMIN)
   @Post('/removerole/:userId')
   async removeUserRole(@Param('userId') userId:ObjectId, @Body() data:Object){
      return new SibasiResponse('Successfully removed user role', await this.userService.removeUserRoles(userId, data));
   }

   @Delete(':id')
   async deleteUser(@Param('id') id:string) {
      return new SibasiResponse('Successfully deleted user details', await this.userService.deleteUser(id));
   }

   @Role(Roles.HUMANRESOURCE, Roles.SUPERVISOR, Roles.USERADMIN)
   @Get('/profile/:id')
   async getUserProfileImg(@Param('id') id:string, @Res() res){
      return new SibasiResponse('Successfully fetched users profile image', await this.uploadService.findUserProfileImg(id, res));
   }

   @Get('/department/:id')
   async findUsersInADepartment(@Param('id') id:ObjectId){
      return new SibasiResponse('Department users successfully fetched', await this.userService.findUsersInACertainDepartment(id));
   }
}