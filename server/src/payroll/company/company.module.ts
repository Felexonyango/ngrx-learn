import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { storage } from "src/fileUpload/config/gridfs.config";
import { FileModule } from "src/fileUpload/fileUpload.module";
import { User, UserSchema } from "src/user/models/user.schema";
import { BenefitController } from "./controllers/benefit.controller";
// import { FileUploadService } from "src/fileUpload/services/fileUpload.services";
// import { User, UserSchema } from "src/users/Models/users.schema";
// import { UsersModule } from "src/users/users.module";
import { CompanyController } from "./controllers/company.controller";
import { ContractController } from "./controllers/contract.controller";
import { DeductionController } from "./controllers/deduction.controller";
import { DepartmentController } from "./controllers/department.controller";
import { EmployeeTypeController } from "./controllers/employeetype.controller";
import { Benefits, BenefitsSchema } from "./models/benefit.schema";
import { Company, CompanySchema } from "./models/company.schema";
import { Contract, ContractSchema } from "./models/contract.schema";
import { Deduction, DeductionSchema } from "./models/deduction.schema";
import { Department, DepartmentSchema } from "./models/department.schema";
import { EmployeeType, EmployeeTypeSchema } from "./models/employeetype.schema";
import { BenefitService } from "./services/benefit.service";
import { CompanyService } from "./services/company.service";
import { ContractService } from "./services/contract.service";
import { DeductionService } from "./services/deduction.service";
import { DepartmentService } from "./services/department.service";
import { EmployeeTypeService } from "./services/employeetype.service";

@Module({
    imports:[MongooseModule.forFeature([{name:Company.name, schema:CompanySchema}]),
             MongooseModule.forFeature([{name:Department.name, schema:DepartmentSchema}]),
             MongooseModule.forFeature([{name:Benefits.name, schema:BenefitsSchema}]),
             MongooseModule.forFeature([{name:Deduction.name, schema:DeductionSchema}]),
             MongooseModule.forFeature([{name:Contract.name, schema:ContractSchema}]),
             MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
             MongooseModule.forFeature([{name:EmployeeType.name, schema:EmployeeTypeSchema}]),
             FileModule,
             MulterModule.register({
             storage:storage
    })
],
    controllers: [CompanyController,DepartmentController,BenefitController,DeductionController,ContractController,EmployeeTypeController],
    providers: [CompanyService,JwtService,DepartmentService,BenefitService,DeductionService,ContractService,EmployeeTypeService],
    exports:[CompanyService,DepartmentService,BenefitService,DeductionService,ContractService,EmployeeTypeService]
  })
  export class CompanyModule {}