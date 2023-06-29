import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User extends Document {
  @Prop({
    ref: 'Space',
    index: true,
  })
  space: Types.ObjectId;

  @Prop()
  _id: string;

  @Prop()
  displayName: string;

  @Prop()
  email: string;

  @Prop({ default: 100 })
  credits: number;

  @Prop({ default: 0 })
  rewards: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
