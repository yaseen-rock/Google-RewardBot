import { Injectable } from '@nestjs/common';
import { GoogleService } from './modules/google/google.service';

@Injectable()
export class AppService {
  constructor(private _googleService: GoogleService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getUserEmail() {
    return await this._googleService.getUserEmail('aqs');
  }
}
