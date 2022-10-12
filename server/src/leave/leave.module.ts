import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { storage } from "src/fileUpload/config/gridfs.config";
import { FileModule } from "src/fileUpload/fileUpload.module";
import { MailModule } from "src/mail/mail.module";
import { CompanyModule } from "src/payroll/company/company.module";
import { PaySlipInfoModule } from "src/payroll/payroll.module";
import { User, UserSchema } from "src/user/models/user.schema";
import { UserModule } from "src/user/user.module";
import { HolidayController } from "./controller/holiday.controller";
import { LeaveController } from "./controller/leave.controller";
import { LeaveSettingController } from "./controller/leaveSetting.controller";
import { LeaveTypeController } from "./controller/leaveType.controller";
import { NoteController } from "./controller/note.controller";
import { SupervisorController } from "./controller/supervisor.controller";
import { Holiday, HolidaySchema } from "./models/holiday.schema";
import { Leave, LeaveSchema } from "./models/leave.schema";
import { LeaveSetting, LeaveSettingSchema } from "./models/leaveSettings.model";
import { LeaveType, LeaveTypeSchema } from "./models/leaveType.schema";
import { Note, NoteSchema } from "./models/note.schema";
import { HolidayService } from "./services/holiday.service";
import { LeaveService } from "./services/leave.service";
import { LeaveSettingService } from "./services/leaveSetting.service";
import { LeaveTypeService } from "./services/leaveType.service";
import { NoteService } from "./services/note.service";
import { PublicHolidayService } from "./services/publichols.service";

@Module({
    imports:[
        PaySlipInfoModule,
        CompanyModule,
        UserModule,
        MongooseModule.forFeature([{name:Leave.name, schema:LeaveSchema}]),
        MongooseModule.forFeature([{name:LeaveType.name, schema:LeaveTypeSchema}]),
        MongooseModule.forFeature([{name:LeaveSetting.name, schema:LeaveSettingSchema}]),
        MongooseModule.forFeature([{name:Holiday.name, schema:HolidaySchema}]),
        MongooseModule.forFeature([{name:Note.name, schema:NoteSchema}]),
        MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
        FileModule,
        MulterModule.register({storage:storage}),
        MailModule
    ],
    providers:[LeaveService, LeaveTypeService, LeaveSettingService, HolidayService, NoteService, PublicHolidayService],
    controllers:[LeaveController,LeaveTypeController,SupervisorController, HolidayController, LeaveSettingController, NoteController],
    exports:[LeaveService, LeaveSettingService]
})

export class LeaveModule {}