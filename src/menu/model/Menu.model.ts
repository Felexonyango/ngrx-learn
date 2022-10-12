import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Roles } from 'src/user/models/user.schema';

@Schema({
  timestamps: true,
})
export class Children extends Document {
  @ApiProperty()
  @Prop()
  label: string;

  @ApiProperty()
  @Prop()
  routerLink: string;

  @ApiProperty()
  @Prop()
  role: Roles[];
}


@Schema({
  timestamps: true,
})
export class Menu extends Document {
  @ApiProperty()
  @Prop()
  label: string;

  @ApiProperty()
  @Prop()
  routerLink: [];

  @ApiProperty()
  @Prop()
  icon: string;

  @ApiProperty()
  @Prop()
  role: Roles[];

  @ApiProperty()
  @Prop()
  items: Children[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);