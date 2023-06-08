import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { ChatbotController } from './modules/chatbot/chatbot.controller';

@Module({
  imports: [ChatbotModule],
  controllers: [AppController, ChatbotController],
  providers: [AppService],
})
export class AppModule {}
