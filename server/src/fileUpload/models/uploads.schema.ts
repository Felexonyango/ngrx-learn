import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";

@Schema()
export class Upload extends Document {

    @Prop()
    moduleID:string;

    @Prop()
    fileID:string;

    @Prop()
    fileType:string;
    
    @Prop()
    fileName:string;

}

export const UploadSchema = SchemaFactory.createForClass(Upload);