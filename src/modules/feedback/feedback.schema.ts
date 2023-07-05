import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Feedback extends Document {
  @Prop({
    ref: 'User',
    index: true,
  })
  user: Types.ObjectId;

  @Prop()
  feedback: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
