/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document} from "mongoose";

@Schema({
    timestamps:true
})
export class NhifTier extends Document{

    @Prop()
    nhifTier:number;

    @Prop()
    max:number;

    @Prop()
    min:number;

    @Prop()
    nhif:number;

}
export const NhifSchema = SchemaFactory.createForClass(NhifTier);

export class NhifDTO {
    @ApiProperty()
    nhifTier:number;

    @ApiProperty()
    max:number;

    @ApiProperty()
    min:number;

    @ApiProperty()
    nhif:number;
}                                               