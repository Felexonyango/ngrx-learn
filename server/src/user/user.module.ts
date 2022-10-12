import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { storage } from "src/fileUpload/config/gridfs.config";
import { FileModule } from "src/fileUpload/fileUpload.module";
import { LeaveSetting, LeaveSettingSchema } from "src/leave/models/leaveSettings.model";
import { LeaveType, LeaveTypeSchema } from "src/leave/models/leaveType.schema";
import { MailModule } from "src/mail/mail.module";
import { MenuModule } from "src/menu/menu.module";
import { CompanyModule } from "src/payroll/company/company.module";
import { Department, DepartmentSchema } from "src/payroll/company/models/department.schema";
import { jwtConstants } from "./auth/jwt.constants";
import { JwtStrategy } from "./auth/jwtStratetegy";
import { RolesGuard } from "./auth/roles.guard";
import { AuthController } from "./controller/auth.controller";
import { UserController } from "./controller/user.controller";
import { User, UserSchema } from "./models/user.schema";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";

@Module({
    imports:[
        JwtModule.register({
            secret:jwtConstants,
            signOptions:{expiresIn:'7d'}
        }),
        MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
        MongooseModule.forFeature([{name:Department.name,schema:DepartmentSchema}]),
        MongooseModule.forFeature([{name:LeaveType.name, schema:LeaveTypeSchema}]),
        FileModule,
        MulterModule.register({storage:storage}),
        CompanyModule,
        MailModule
    ],
    providers:[UserService, AuthService, JwtStrategy,
      {
        provide: APP_GUARD,
        useClass: RolesGuard,
      }
    ],
    controllers:[UserController, AuthController],
    exports:[UserService]
})

export class UserModule {}