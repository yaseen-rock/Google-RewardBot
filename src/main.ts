import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GoogleService } from './modules/google/google.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(parseInt(app.get(ConfigService).get('port')));
  // let googleService = app.get(GoogleService);
  // console.log(await googleService.getSpaceMembers());
}
bootstrap();
