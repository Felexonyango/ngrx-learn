import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalException } from './customs/globalException';
import { FileModule } from './fileUpload/fileUpload.module';
import { LeaveModule } from './leave/leave.module';
import { MenuModule } from './menu/menu.module';
import { CompanyModule } from './payroll/company/company.module';
import { PaySlipInfoModule } from './payroll/payroll.module';
import { JwtAuthGuard } from './user/auth/auth.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CompanyModule,
    PaySlipInfoModule,
    LeaveModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/hrsystem'),
    ScheduleModule.forRoot(),
    FileModule,
    MenuModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:APP_FILTER,
      useClass:GlobalException
    }
  ],
})
export class AppModule {}
