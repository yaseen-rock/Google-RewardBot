import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardsLogService } from './rewardsLog.service';
import { RewardsLog, RewardsLogSchema } from './rewardsLog.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RewardsLog.name, schema: RewardsLogSchema }]),
  ],
  providers: [RewardsLogService],
  exports: [RewardsLogService],
})
export class RewardsLogModule {}
