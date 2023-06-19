import { Injectable } from '@nestjs/common';
import { GoogleService } from '../google/google.service';
import { SpaceService } from '../space/space.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatbotService {
  constructor(
    private _googleService: GoogleService,
    private _spaceService: SpaceService,
    private _userService: UserService,
  ) {}
  async getResponse(req, res) {
    console.log(req.body);
    let data;
    let { type, message } = req.body;
    switch (req.body.type) {
      case 'MESSAGE':
        if (message?.slashCommand) {
          const spaceType = req.body.space.type;
          console.log(spaceType);
          const sender = message.sender.displayName;
          switch (parseInt(message.slashCommand.commandId)) {
            case 1: // /mypoint
              console.log('mypoint');
              if (spaceType == 'DM') {
                data = await this.getUserRewardPoint(sender);
              } else {
                const imageWidget = {
                  image: {
                    imageUrl: 'https://i.imgur.com/8cDlirX.png',
                    altText: 'add-bot-to-chat',
                  },
                };

                const cardHeader = {
                  title: `⚠️ Add Bot to Chat to use /mypoint`,
                };

                const avatarWidget = {
                  textParagraph: {
                    text: `Sorry.This option is only available in Direct Chat. To know your points, Please add the bot to 1:1 chat and try again.`,
                  },
                };

                const avatarSection = {
                  widgets: [avatarWidget, imageWidget],
                };

                data = {
                  cardsV2: [
                    {
                      cardId: 'myPointsCard',
                      card: {
                        name: 'My Points Card',
                        header: cardHeader,
                        sections: [avatarSection],
                      },
                    },
                  ],
                };
              }
              break;
            case 2: // /help
              data = {
                text: `You can send rewards to peers for their acheivement/appreciate them for helping you right from google chat
Example: *@Optimus Reward Bot +5 @visaga for helping me launch a marketing campaign so that we can generate new business #teamwork*
Suggested hashtags are: #teamwork, #leadership, #problem-solving, #innovation, #customer-service, #vision, #your-company-values-here, and #wellness-at-work.  
You can give to users: Annie, Barko, Bear, Blue, Fig, Maple, Moose, Pepper, Sven and 2 more. 
 
*Available commands:*
    /mypoint - To get your current credits and rewards
    /redeem <reward_point> - To Send Redeem request `,
              };
              //console.log('inside case 1');
              break;
            case 3: //redeem
              data = {
                text: `Sorry. Development in progress...`,
              };
              break;
            default:
              data = {
                text: 'Oops! No slash command found!',
              };
          }
          console.log(data);
          res.send(data);
        } else {
          if (this.isValidRewardMessage(message.argumentText)) {
            await this.calculateRewardPoint(req);
            await this.sendResponse(req, res);
          } else {
            let data = {
              text: 'Sorry! Please check you either miss receiver name or reward. To know more send /help',
            };
            res.send(data);
          }
        }
        break;
      case 'ADDED_TO_SPACE':
        console.log(req.body.space.name);
        let space = await this._spaceService.findOne({
          _id: req.body.space.name,
        });
        if (!space) {
          let space = req.body.space;
          let type =
            space.spaceType == 'SPACE' && space.type == 'ROOM'
              ? 'Space'
              : space.spaceType == 'DIRECT_MESSAGE' && space.type == 'ROOM'
              ? 'Group Chat'
              : 'DM';
          let data = {
            _id: req.body.space.name,
            name: req.body.space.displayName,
            type: type,
          };
          await this._spaceService.create(data);
        }
        let card: any = await this._googleService.getSpaceMembers(
          req.body.space.name,
        );

        const cardHeader = {
          title: `🥳 Thanks for adding Reward Bot Dev to spaces`,
        };

        const avatarWidget = {
          textParagraph: {
            text: `You can send your peers reward for their acheivements or appreciate them for helping you right from spaces
            To know more send /help`,
          },
        };

        const avatarSection = {
          widgets: [avatarWidget],
        };

        let cardData = {
          cardsV2: [
            {
              cardId: 'avatarCard',
              card: {
                name: 'Avatar Card',
                header: cardHeader,
                sections: [avatarSection],
              },
            },
          ],
        };
        //let spaceData = await this._spaceService.findOne()
        res.send(cardData);
        break;
      default:
        console.log(req.body.type);
        break;
    }
  }

  sendResponse(req, res) {
    const sender = req.body.message.sender.displayName;
    const image = req.body.message.sender.avatarUrl;
    const text = req.body.message.argumentText;
    let { message } = req.body;

    let data = this.createMessage(text, sender);

    console.log(data);
    res.send(data);
  }

  createMessage(text, sender) {
    // let rewardpt = this.calculateRewardPoint(text);
    // let receiver = this.findReceiver(text);
    // let senderPoint = 100 - rewardpt;
    // const cardHeader = {
    //   title: `🥳` + `@${receiver}` + `               ` + `+${rewardpt}`,
    // };

    // const avatarWidget = {
    //   textParagraph: {
    //     text: `${sender}: ${text}`,
    //     //  Your current point is ${senderPoint}`,
    //   },
    // };

    // // const avatarImageWidget = {
    // //   image: { imageUrl },
    // // };

    // const avatarSection = {
    //   widgets: [avatarWidget],
    // };

    // return {
    //   cardsV2: [
    //     {
    //       cardId: 'avatarCard',
    //       card: {
    //         name: 'Avatar Card',
    //         header: cardHeader,
    //         sections: [avatarSection],
    //       },
    //     },
    //   ],
    // };

    let rewardpt = this.getRewardPoint(text);
    let receiver = this.getReceiver(text);
    //let senderPoint = 100 - rewardpt;

    let response: any = {
      text: `You can send rewards to peers for their acheivement/appreciate them for helping you right from google chat
Example: *@Optimus Reward Bot +5 @visaga for helping me launch a marketing campaign so that we can generate new business #teamwork*
Suggested hashtags are: #teamwork, #leadership, #problem-solving, #innovation, #customer-service, #vision, #your-company-values-here, and #wellness-at-work.  
You can give to users: Annie, Barko, Bear, Blue, Fig, Maple, Moose, Pepper, Sven and 2 more. 
       
*Available commands:*
          /mypoint - To get your current credits and rewards
          /redeem <reward_point> - To Send Redeem request `,
    };

    if (rewardpt !== null && receiver !== null) {
      const cardHeader = {
        title: `🥳` + `@${receiver}` + `               ` + `+${rewardpt}`,
      };

      const avatarWidget = {
        textParagraph: {
          text: `${sender}: ${text}`,
          //  Your current point is ${senderPoint}`,
        },
      };

      // const avatarImageWidget = {
      //   image: { imageUrl },
      // };

      const avatarSection = {
        widgets: [avatarWidget],
      };

      return {
        cardsV2: [
          {
            cardId: 'avatarCard',
            card: {
              name: 'Avatar Card',
              header: cardHeader,
              sections: [avatarSection],
            },
          },
        ],
      };
    }

    return response;
  }

  getRewardPoint(text) {
    const regex = /\+(\d+)/;
    const match = text.match(regex);

    if (match && match.length > 1) {
      const rewardPoint = match[1];
      console.log(rewardPoint);
      return rewardPoint;
    } else {
      console.log('No match found.');
      return null;
      return null;
    }
  }

  getReceiver(text) {
    const regex = /@(\w+(\s+\w+))\b/;
    const match = text.match(regex);

    if (match && match.length > 1) {
      const receiver = match[1];
      console.log(receiver);
      return receiver;
    } else {
      console.log('No match found.');
      return null;
    }
  }

  async getUserRewardPoint(user) {
    let userDetails = await this._userService.findOne({ displayName: user });
    return {
      text: `
      Your Giveable credits for this month: *${userDetails.credits}*
      Your redeemable reward point: *${userDetails.rewards}*
      You can send redeem request using /redeem <reward_point>
      _Eg: /redeem 100_`,
    };
  }

  isValidRewardMessage(text) {
    let rewardpt = this.getRewardPoint(text);
    let receiver = this.getReceiver(text);

    if (receiver !== null && rewardpt !== null) {
      return true;
    }

    return false;
  }

  async calculateRewardPoint(req) {
    const senderName = req.body.message.sender.displayName;
    const senderAvatarUrl = req.body.message.sender.avatarUrl;
    const text = req.body.message.argumentText;
    let rewardpt = this.getRewardPoint(text);
    let receiverName = this.getReceiver(text);

    let sender = await this._userService.findOne({ displayName: senderName });
    console.log(sender);
    if (!sender) {
      await this._userService.create({
        _id: req.body.message.sender.name,
        space: req.body.message.space.name,
        displayName: req.body.message.sender.displayName,
      });
      sender = await this._userService.findOne({ displayName: senderName });
    }
    console.log(sender);
    let receiver = await this._userService.findOne({
      displayName: receiverName,
    });
    if (!receiver) {
      await this._googleService.getSpaceMembers(req.body.message.space.name);
      receiver = await this._userService.findOne({ displayName: receiverName });
    }

    await this.updateCredit(sender, rewardpt);
    await this.updateReward(receiver, rewardpt);
  }

  async updateCredit(sender, rewardSent) {
    let credits = sender.credits - rewardSent;
    await this._userService.findByIdAndUpdate(sender._id, { credits: credits });
  }

  async updateReward(receiver, rewardReceived) {
    console.log(typeof rewardReceived);
    console.log(typeof receiver.rewards);

    let rewards = receiver.rewards + parseInt(rewardReceived);
    await this._userService.findByIdAndUpdate(receiver._id, {
      rewards: rewards,
    });
  }
}
