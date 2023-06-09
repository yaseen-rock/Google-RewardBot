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
  workspace: Types.ObjectId;

  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  displayName: string;

  @Prop()
  avatarUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
