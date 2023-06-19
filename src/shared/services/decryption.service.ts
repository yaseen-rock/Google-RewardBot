import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class DecryptService {
  private encKey: string;
  constructor(private _configService: ConfigService) {
    this.encKey = this._configService.get('google.encKey');
  }

  //Encrypt the text
  encrypt(text) {
    const key = crypto.createHash('sha256').update(this.encKey).digest('hex');
    let cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(key, 'hex'),
      Buffer.alloc(16),
    );

    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    console.log('--------------------Encrypted---------------------');
    console.log(encrypted.toString('base64'));
    return encrypted.toString('base64');
  }

  decrypt(text) {
    const key = crypto.createHash('sha256').update(this.encKey).digest('hex');

    let encryptedText = Buffer.from(text, 'base64');
    let decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(key, 'hex'),
      Buffer.alloc(16),
    );

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
