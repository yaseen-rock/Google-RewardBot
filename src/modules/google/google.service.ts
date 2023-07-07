import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//const { google } = require('googleapis');
import { google } from 'googleapis';
import { User } from 'src/interface/user';
import { SpaceService } from '../space/space.service';
import { UserService } from '../user/user.service';
import { DecryptService } from 'src/shared/services/decryption.service';
import { RollbarLogger } from 'nestjs-rollbar';

@Injectable()
export class GoogleService {
  encryptText: any;
  constructor(
    private _configService: ConfigService,
    private _spaceService: SpaceService,
    private _userService: UserService,
    private _decryptService: DecryptService,
    private _rollbarLogger: RollbarLogger,
  ) {
    this.encryptText = this._configService.get('google.encText');
  }

  async authorize(scopes) {
    //let googleCred = JSON.parse(this._configService.get('google.credential'));

    // let credentials = {
    //   client_email: googleCred.client_email,
    //   private_key: googleCred.private_key,
    // };;
    // console.log('encrypt');
    // let encryptText=
    //   await this._decryptService.encrypt(JSON.stringify(credentials));

    let decryptText = JSON.parse(
      await this._decryptService.decrypt(this.encryptText),
    );

    let authClient = new google.auth.GoogleAuth({
      //keyFilename: './client_secret.json',
      credentials: decryptText,
      scopes: scopes,
    });

    if (authClient == null) {
      this._rollbarLogger.error('authentication failed');
      throw Error('authentication failed');
    }

    return authClient;
  }

  async createMessage(msg) {
    let chatScope = [
      'https://www.googleapis.com/auth/chat.bot',
      'https://www.googleapis.com/auth/chat.messages',
    ];
    const auth = await this.authorize(chatScope);

    const chat = google.chat({ version: 'v1', auth });

    try {
      let data = await chat.spaces.messages.create({
        parent: 'spaces/t8FqEUAAAAE',
        requestBody: { text: msg },
      });
      console.log(data);
      return { message: 'message created' };
    } catch (error) {
      console.log(error);
      return { message: 'Failed to create message' };
    }
  }

  async deleteMessage(messageId) {
    let chatScope = [
      'https://www.googleapis.com/auth/chat.bot',
      'https://www.googleapis.com/auth/chat.messages',
    ];
    const auth = await this.authorize(chatScope);

    const chat = google.chat({ version: 'v1', auth });

    // let createMessageResponse = await chat.message.create({});
    let data = await chat.spaces.messages.delete({
      name: 'spaces/t8FqEUAAAAE/messages/QUsOPEzjSZ0.QUsOPEzjSZ0',
    });
    console.log(data);
  }

  async getSpaceMembers(spaceId) {
    let chatScope = [
      'https://www.googleapis.com/auth/chat.bot',
      'https://www.googleapis.com/auth/chat.memberships',
    ];
    const auth = await this.authorize(chatScope);

    const chat = google.chat({ version: 'v1', auth });

    // let createMessageResponse = await chat.message.create({});
    let { data } = await chat.spaces.members.list({
      parent: spaceId,
    });

    let memberships = data.memberships;
    let members = [];
    memberships.map((membership) => members.push(membership.member));

    let space = await this._spaceService.findOne({ _id: spaceId });

    for (let member of members) {
      let user = await this._userService.findOne({ _id: member.name });
      if (!user) {
        let email = await this.getUserEmail(member.name.split('/')[1]);
        let data = {
          space: space._id,
          _id: member.name,
          email: email,
          displayName: member.displayName,
        };
        await this._userService.create(data);
      }
    }
  }

  async getUserEmail(userId: string) {
    let adminScope = [
      'https://www.googleapis.com/auth/admin.directory.user',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    const auth = await this.authorize(adminScope);

    const admin = google.admin({
      version: 'directory_v1',
      auth: auth,
    });

    let response = await admin.users.get({
      userKey: userId,
    });

    console.log(response.data);
    return response.data.primaryEmail;
  }
}
