import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Space extends Document {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  type: string;
}

export const SpaceSchema = SchemaFactory.createForClass(Space);
