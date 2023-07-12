import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { GoogleModule } from '../google/google.module';
import { SpaceModule } from '../space/space.module';
import { UserModule } from '../user/user.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { AnalyticsService } from '../google_analytics/analytics.service';

@Module({
  imports: [GoogleModule, SpaceModule, UserModule, FeedbackModule],
  controllers: [ChatbotController],
  providers: [ChatbotService, AnalyticsService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
