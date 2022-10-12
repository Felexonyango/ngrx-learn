import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, ObjectId } from "mongoose";
import { Upload } from "../models/uploads.schema";
import * as MongoGridFs from 'mongo-gridfs';


const dbUrl = 'mongodb://localhost:27017/uploads';
async function initDb(){
    const connectDb = await mongoose.connect(dbUrl);
    const gridConfig = new MongoGridFs.MongoGridFS(
        connectDb.connection.db,
        'uploads'
    );

    return gridConfig;
}

let gridFs = initDb();

@Injectable()
export class FileUploadService {
    constructor(@InjectModel(Upload.name) private uploadsModel:Model<Upload>){}

    async uploadFile(moduleId, file,user){
        
        let fileInfo = {
            moduleID:moduleId,
            fileID:file.id,
            fileName:file.filename,
            fileType:file.mimetype,
            createdBy:user.userId
        }

        return await new this.uploadsModel(fileInfo).save();
    }

    async findFile(moduleId, res, userId){
        // const fileDetails = await this.uploadsModel.findOne({$and:[{createdBy:`${userId}`}, {moduleID:`${companyId}`}]});
        const fileDetails= await this.uploadsModel.findOne({ moduleID:`${moduleId}`})
        
        if(fileDetails){
            const fileFromBucket = await (await gridFs).findById(fileDetails.fileID);
            const fileToPipe = await (await gridFs).readFileStream(`${fileFromBucket._id}`);
            fileToPipe.pipe(res);
        } else {
            throw new HttpException('Company has no files attached', HttpStatus.NOT_FOUND);
        }
    }

    async findUserProfileImg(moduleId, res){
        const fileDetails = await this.uploadsModel.findOne({ moduleID: moduleId});

        if(fileDetails){
            const fileFromBucket = await (await gridFs).findById(fileDetails.fileID);
            const fileToPipe = await (await gridFs).readFileStream(`${fileFromBucket._id}`);
            fileToPipe.pipe(res);
        } else {
            throw new HttpException('No user attached profile image', HttpStatus.NOT_FOUND);
        }
    }
}