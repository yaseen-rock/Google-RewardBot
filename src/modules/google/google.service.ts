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

  async deleteMessage(messageId) {
    let chatScope = [
      'https://www.googleapis.com/auth/chat.bot',
      'https://www.googleapis.com/auth/chat.messages',
    ];
    const auth = await this.authorize(chatScope);

    const chat = google.chat({ version: 'v1', auth });

    // let createMessageResponse = await chat.message.create({});
    let data = await chat.spaces.messages.delete({
      name: messageId,
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
        let data: User = {
          space: space._id,
          _id: member.name,
          displayName: member.displayName,
        };
        await this._userService.create(data);
      }
    }
  }

  async getUserEmail(userId: string) {
    let adminScope = [
      'https://www.googleapis.com/auth/admin.directory.user',
      'https://www.googleapis.com/auth/admin.directory.user.readonly',
    ];

    let googleCred = JSON.parse(this._configService.get('google.credential'));

    let credentials = {
      client_email: googleCred.client_email,
      private_key: googleCred.private_key,
    };

    console.log(credentials);

    let authClient = await google.auth.getClient({
      credentials: credentials,
      scopes: adminScope,
    });

    //let peopleScope = ['https://www.googleapis.com/auth/contacts.readonly'];

    // const auth = await this.authorize(adminScope);

    const admin = google.admin({
      version: 'directory_v1',
      auth: authClient,
    });

    console.log(admin);
    // const people = google.people({ version: 'v1', auth });

    let response = await admin.users.get({
      userKey: userId,
    });

    console.log(response);
  }
}
