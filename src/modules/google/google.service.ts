import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const { google } = require('googleapis');

@Injectable()
export class GoogleService {
  constructor(private _configService: ConfigService) {}

  async authorize() {
    let credentials = this._configService.get('google.credentials');
    //console.log(decryptText);

    let authClient = new google.auth.GoogleAuth({
      //keyFilename: './client_secret.json',
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/chat.bot'],
    });

    if (authClient == null) {
      throw Error('authentication failed');
    }

    return authClient;
  }

  async getSpaceMembers() {
    const auth = await this.authorize();
    const chat = google.chat({ version: 'v1', auth });
    //console.log(chat);

    // let createMessageResponse = await chat.message.create({});
    let getSpaceDetails = await chat.spaces.get({
      name: 'spaces/AAAAZdWsnzM',
    });

    console.log(getSpaceDetails);
  }
}
