import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "bson";
import mongoose, { Document } from "mongoose";

@Schema()
export class Note extends Document {
    @ApiProperty()
    @Prop()
    note:string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref : 'Leave'})
    leaveId:ObjectId;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    commentBy:ObjectId;
}
export const NoteSchema = SchemaFactory.createForClass(Note);


export class NoteDTO {
    @ApiProperty()
    note:string;

    leaveId:ObjectId;

    commentBy:ObjectId;
}