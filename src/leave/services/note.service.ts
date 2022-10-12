import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId } from "bson";
import { Model } from "mongoose";
import { Note, NoteDTO } from "../models/note.schema";

@Injectable()
export class NoteService {
    constructor(@InjectModel(Note.name) private noteModel:Model<Note>){}

    async getLeaveNotes(leaveId){
        return await this.noteModel.find({leaveId:`${leaveId}`})
    }

    async postNote(data:NoteDTO){
        return await new this.noteModel(data).save();
    }

    async deleteNote(leaveId:ObjectId, noteId:ObjectId, userId){
        const commentBy = await this.noteModel.findOne({leaveId:leaveId, _id:noteId});
        if(commentBy.commentBy == userId){
            return await this.noteModel.findOneAndDelete({leaveId:leaveId, _id:noteId});
        } else {
            return 'You are not allowed to delete this comment'
        }
        
    }
}