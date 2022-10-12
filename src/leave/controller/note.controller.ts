import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "bson";
import { TestResponse } from "src/customs/response";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { Role } from "src/user/auth/role.decorator";
import { getUser } from "src/user/auth/user.decorator";
import { Roles } from "src/user/models/user.schema";
import { NoteDTO } from "../models/note.schema";
import { NoteService } from "../services/note.service";

@Controller('note')
@UseGuards(JwtAuthGuard)
@Role(Roles.SUPERVISOR, Roles.USER, Roles.HUMANRESOURCE)
@ApiTags('Note')
export class NoteController {
    constructor(private noteService:NoteService){}

    @Get('/:leaveId')
    async notesForALeave(@Param('leaveId') leaveId:ObjectId){
        return new TestResponse('Notes for leave successfully fetched', await this.noteService.getLeaveNotes(leaveId));
    }

    @Post('/:leaveId')
    async postNoteForLeave(@Body() data:NoteDTO, @Param('leaveId') leaveId:ObjectId, @getUser() user){
        data.commentBy = user.userId;
        data.leaveId = leaveId;
        return new TestResponse('Note successfully posted', await this.noteService.postNote(data));
    }

    @Delete('/:leaveId/:noteId')
    async deleteNote(@Param('leaveId') leaveId:ObjectId, @Param('noteId') noteId:ObjectId, @getUser() user){
        return new TestResponse('Note successfully deleted', await this.noteService.deleteNote(leaveId, noteId, user.userId));
    }
}