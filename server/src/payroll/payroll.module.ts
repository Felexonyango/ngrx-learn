/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User,UserSchema } from "src/user/models/user.schema";
import { Benefits, BenefitsSchema } from "./company/models/benefit.schema";
import { Deduction, DeductionSchema } from "./company/models/deduction.schema";
import { NhifTierController } from "./payroll/controllers/nhif.controller";
import { PayInfoController } from "./payroll/controllers/payinfo.controller";
import { PayRollController } from "./payroll/controllers/payroll.controller";
import { PaySlipController } from "./payroll/controllers/payslip.controller";
import { TierController } from "./payroll/controllers/tier.controller";
import { NhifSchema, NhifTier } from "./payroll/models/nhif.schema";
import { PayInfo, PayInfoSchema } from "./payroll/models/payinfo.schema";
import { PayRoll, PayRollSchema } from "./payroll/models/payroll.schema";
import { PaySlip, PaySlipSchema } from "./payroll/models/payslip.schema";
import { Tier, TierSchema } from "./payroll/models/tier.schema";
import { NhifTierService } from "./payroll/services/nhif.service";
import { PayInfoService } from "./payroll/services/payinfo.service";
import { PayrollService } from "./payroll/services/payroll.service";
import { PaySlipService } from "./payroll/services/payslip.service";
import { TierService } from "./payroll/services/tier.service";

@Module({
    imports:[
             MongooseModule.forFeature([{name:PayRoll.name, schema:PayRollSchema}]),
             MongooseModule.forFeature([{name:PaySlip.name, schema:PaySlipSchema}]),
             MongooseModule.forFeature([{name:Tier.name, schema:TierSchema}]),
             MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
             MongooseModule.forFeature([{name:Deduction.name, schema:DeductionSchema}]),
             MongooseModule.forFeature([{name:Benefits.name, schema:BenefitsSchema}]),
             MongooseModule.forFeature([{name:NhifTier.name, schema:NhifSchema}]),
             MongooseModule.forFeature([{name:PayRoll.name, schema:PayRollSchema}]),
             MongooseModule.forFeature([{name:PayInfo.name, schema:PayInfoSchema}])

          ],
    controllers: [PaySlipController,TierController,NhifTierController,PayRollController,PayInfoController],
    providers: [JwtService,TierService,NhifTierService,PaySlipService,PayrollService,PayInfoService],
    exports:[JwtService,TierService,NhifTierService,PaySlipService,PayrollService,PayInfoService]
  })
  export class PaySlipInfoModule {}