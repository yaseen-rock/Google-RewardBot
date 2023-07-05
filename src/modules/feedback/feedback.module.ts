import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackSchema } from './feedback.schema';
import { FeedbackService } from './feedback.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Feedback',
        schema: FeedbackSchema,
        collection: 'Feedback',
      },
    ]),
  ],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
