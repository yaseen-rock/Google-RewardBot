import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceSchema } from './space.schema';
import { SpaceService } from './space.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Space',
        schema: SpaceSchema,
        collection: 'Space',
      },
    ]),
  ],
  providers: [SpaceService],
  exports: [SpaceService],
})
export class SpaceModule {}
