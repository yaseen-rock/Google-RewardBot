import { Global, Module } from '@nestjs/common';
import { DecryptService } from './services/decryption.service';

@Global()
@Module({
  providers: [DecryptService],
  exports: [DecryptService],
})
export class SharedModule {}
