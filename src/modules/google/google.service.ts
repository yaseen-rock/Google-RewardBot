import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//const { google } = require('googleapis');
import { google } from 'googleapis';
import { User } from 'src/interface/user';
import { SpaceService } from '../space/space.service';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleService {
  constructor(
    private _configService: ConfigService,
    private _spaceService: SpaceService,
    private _userService: UserService,
  ) {}

  async authorize(scopes) {
    // console.log('inside authorize');
    // let cred = this._configService.get('google.credential');
    // console.log(cred);
    // console.log(typeof cred);
    let googleCred = JSON.parse(this._configService.get('google.credential'));

    // console.log('googleCred');
    // console.log(typeof googleCred);
    // console.log(googleCred);

    // let client_email = this._configService.get('google.client_email');

    // console.log('clientemail');
    // console.log(client_email);

    // let private_key = this._configService
    //   .get('google.private_key')
    //   .split(String.raw`\n`)
    //   .join('\n');
    // console.log('privatekey');
    // console.log(private_key);

    // let credentials = {
    //   client_email: client_email,
    //   private_key: private_key,
    // };

    let credentials = {
      client_email: googleCred.client_email,
      private_key: googleCred.private_key,
    };

    // console.log('client email');
    // console.log(typeof googleCred.client_email);
    // console.log(googleCred.client_email);

    // console.log('private key');
    // console.log(typeof googleCred.private_key);
    // console.log(googleCred.private_key);

    console.log('credentials');
    console.log(typeof credentials);
    console.log(credentials);
    console.log('scopes');

    console.log(scopes);

    let authClient = new google.auth.GoogleAuth({
      //keyFilename: './client_secret.json',
      credentials: credentials,
      scopes: scopes,
    });

    if (authClient == null) {
      throw Error('authentication failed');
    }

    return authClient;
  }

  async getSpaceMembers(spaceId) {
    let chatScope = [
      'https://www.googleapis.com/auth/chat.bot',
      'https://www.googleapis.com/auth/chat.memberships',
    ];
    const auth = await this.authorize(chatScope);
    //console.log(auth);
    const chat = google.chat({ version: 'v1', auth });
    //console.log(chat);

    // let createMessageResponse = await chat.message.create({});
    let { data } = await chat.spaces.members.list({
      parent: spaceId,
    });
    console.log(data);
    let memberships = data.memberships;
    let members = [];
    memberships.map((membership) => members.push(membership.member));
    console.log(members);

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
    // console.log('auth');
    // console.log(auth);

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
