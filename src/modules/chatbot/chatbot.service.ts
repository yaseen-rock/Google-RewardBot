import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  async getResponse(req, res) {
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
          data = {
            text: 'Your current reward point is 75',
          };
          //console.log('inside case 1');
          break;
        case 2: // /mypoint
          data = {
            text: 'Your current reward point is 75',
          };
          //console.log('inside case 1');
          break;
        default:
          data = {
            text: 'Oops! No slash command found!',
          };
      }
    } else {
      data = await this.createMessage(text, sender);
    }
    console.log(data);
    res.send(data);
  }

  createMessage(text, sender) {
    let rewardpt = this.calculateRewardPoint(text);
    let receiver = this.findReceiver(text);
    let senderPoint = 100 - rewardpt;
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

  calculateRewardPoint(text) {
    const regex = /\+(\d+)/;
    const match = text.match(regex);

    if (match && match.length > 1) {
      const rewardPoint = match[1];
      console.log(rewardPoint);
      return rewardPoint; // Output: 51
    } else {
      console.log('No match found.');
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
    }
  }

  getUserRewardPoint() {
    return {
      text: 'Your current reward point is 75',
    };
  }
}
