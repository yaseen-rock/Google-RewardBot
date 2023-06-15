import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { SpaceModule } from '../space/space.module';

@Module({
  imports: [ConfigModule, UserModule, SpaceModule],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
