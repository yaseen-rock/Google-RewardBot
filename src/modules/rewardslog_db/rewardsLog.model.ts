import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardsLogDocument = RewardsLog & Document;

@Schema()
export class RewardsLog {
  @Prop({ required: true })
  senderEmail: string;

  @Prop({ required: true })
  receiverEmail: string;

  @Prop({ required: true })
  rewardPoint: number;

  @Prop({ required: true })
  message: string;
}

export const RewardsLogSchema = SchemaFactory.createForClass(RewardsLog);
