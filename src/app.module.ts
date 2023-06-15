import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { ChatbotController } from './modules/chatbot/chatbot.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-rollbar';
import { SpaceModule } from './modules/space/space.module';
import { UserModule } from './modules/user/user.module';
import { GoogleModule } from './modules/google/google.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        accessToken: configService.get('rollbar.accessToken'),
        captureUncaught: true,
        captureUnhandledRejections: true,
        ignoreDuplicateErrors: false,
      }),
      inject: [ConfigService],
    }),
    ChatbotModule,
    SpaceModule,
    UserModule,
    GoogleModule,
  ],
  controllers: [AppController, ChatbotController],
  providers: [AppService],
})
export class AppModule {}
