import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { GoogleModule } from '../google/google.module';
import { SpaceModule } from '../space/space.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [GoogleModule, SpaceModule, UserModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
