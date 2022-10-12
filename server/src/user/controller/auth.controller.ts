/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { TestResponse } from "src/customs/response";
import { JwtAuthGuard } from "../auth/auth.guard";
import { Role } from "../auth/role.decorator";
import { getUser } from "../auth/user.decorator";
import { Roles, User } from "../models/user.schema";
import { AuthService } from "../services/auth.service";

@Controller('auth')
@ApiTags('authorization')
export class AuthController {
    
    constructor(private authService:AuthService){}
    
    @Post('login')
    async loginUser(@Body() data:User){
        return new TestResponse('Succesfully login', await this.authService.login(data)) ;
    }

    @Post('/forgotPassword')
    async forgotPassword(@Body() forgotPasswordDto){
        return new TestResponse('Forgot password registered,please head to password reset', await this.authService.forgotPassword(forgotPasswordDto.email));
    }

    @Post('/changePassword')
    async changePassword(@Body() body: {password: string, email: string}){
        return new TestResponse('Password reset successfully done,head to login.', await this.authService.changePassword(body));
    }
}