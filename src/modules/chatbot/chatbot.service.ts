import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  async getResponse(req, res) {
    // console.log('req');
    // console.log(req.body);
    // const sender = req.body.message.sender.displayName;
    // const image = req.body.message.sender.avatarUrl;
    // const text = req.body.message.argumentText;
    // let data;
    // let { message } = req.body;
    // if (message.slashCommand) {
    //   console.log('inside if');
    //   console.log(typeof message.slashCommand.commandId);
    //   switch (parseInt(message.slashCommand.commandId)) {
    //     case 1: // /mypoint
    //       data = {
    //         text: 'Your current reward point is 75',
    //       };
    //       //console.log('inside case 1');
    //       break;
    //     case 2: // /mypoint
    //       data = {
    //         text: 'Your current reward point is 75',
    //       };
    //       //console.log('inside case 1');
    //       break;
    //     default:
    //       data = {
    //         text: 'Oops! No slash command found!',
    //       };
    //   }
    // } else {
    //   data = await this.createMessage(text, sender);
    // }
    // console.log(data);
    // res.send(data);

    console.log('req');
    console.log(req.body);
    const sender = req.body.message.sender.displayName;
    const image = req.body.message.sender.avatarUrl;
    const text = req.body.message.argumentText;
    let data;
    let { message } = req.body;
    if (message.slashCommand) {
      console.log('inside if');
      console.log(typeof message.slashCommand.commandId);
      switch (parseInt(message.slashCommand.commandId)) {
        case 1: // /mypoint
          data = this.getUserRewardPoint();
          //console.log('inside case 1');
          break;
        case 2: // /help
          data = {
            text: `Example: *@Optimus Reward Bot +5 @visaga for helping me launch a marketing campaign so that we can generate new business #teamwork*
Suggested hashtags are: #teamwork, #leadership, #problem-solving, #innovation, #customer-service, #vision, #your-company-values-here, and #wellness-at-work.  
You can give to users: Annie, Barko, Bear, Blue, Bonusly, Fig, Maple, Moose, Pepper, Sven and 2 more. 
You have 75 points to give.`,
          };
          //console.log('inside case 1');
          break;
        default:
          data = {
            text: 'Oops! No slash command found!',
          };
      }
    } else {
      data = this.createMessage(text, sender);
    }
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

    let rewardpt = this.calculateRewardPoint(text);
    let receiver = this.findReceiver(text);
    let senderPoint = 100 - rewardpt;

    let response: any = {
      text: `Example: *@Optimus Reward Bot +5 @visaga for helping me launch a marketing campaign so that we can generate new business #teamwork*
Suggested hashtags are: #teamwork, #leadership, #problem-solving, #innovation, #customer-service, #vision, #your-company-values-here, and #wellness-at-work.  
You can give to users: Annie, Barko, Bear, Blue, Bonusly, Fig, Maple, Moose, Pepper, Sven and 2 more. 
You have 75 points to give.`,
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

  calculateRewardPoint(text) {
    const regex = /\+(\d+)/;
    const match = text.match(regex);

    if (match && match.length > 1) {
      const rewardPoint = match[1];
      console.log(rewardPoint);
      return rewardPoint; // Output: 51
    } else {
      console.log('No match found.');
      return null;
      return null;
    }
  }

  findReceiver(text) {
    const regex = /@(\w+)/;
    const match = text.match(regex);

    if (match && match.length > 1) {
      const receiver = match[1];
      console.log(receiver);
      return receiver; // Output: abhineet
    } else {
      console.log('No match found.');
      return null;
      return null;
    }
  }

  getUserRewardPoint() {
    return {
      text: 'Your current reward point is 75',
    };
  }
}
