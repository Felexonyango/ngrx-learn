import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { storage } from "./config/gridfs.config";
import { Upload, UploadSchema } from "./models/uploads.schema";
import { FileUploadService } from "./services/fileUpload.services";

@Module({
    imports:[
        MongooseModule.forFeature([{name:Upload.name, schema:UploadSchema}]),
        MulterModule.register({
            storage:storage
        })
    ],
    providers:[FileUploadService],
    controllers:[],
    exports:[FileUploadService]
})

export class FileModule {

}