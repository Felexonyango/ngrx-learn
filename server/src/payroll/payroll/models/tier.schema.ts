/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document} from "mongoose";

@Schema({
    timestamps:true
})
export class Tier extends Document{

    @Prop()
    tier:number;

    @Prop()
    max:number;

    @Prop()
    min:number;

    @Prop()
    percentage:number;

    @Prop()
    increaseValue:number;

}
export const TierSchema = SchemaFactory.createForClass(Tier);

export class TierDTO {
    @ApiProperty()
    tier:number;

    @ApiProperty()
    max:number;

    @ApiProperty()
    min:number;

    @ApiProperty()
    percentage:number;

    @ApiProperty()
    increaseValue:number;
}                                               
