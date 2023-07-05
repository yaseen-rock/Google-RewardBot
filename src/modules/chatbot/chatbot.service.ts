import { Injectable } from '@nestjs/common';
import { GoogleService } from '../google/google.service';
import { SpaceService } from '../space/space.service';
import { UserService } from '../user/user.service';
import { helpCard } from 'src/cards/help';
import { addToChatCard } from 'src/cards/add-to-chat';
import { validationText } from 'src/cards/validation-text';
import { welcomeCard } from 'src/cards/welcome-card';
import { welcomeDMCard } from 'src/cards/welcome-dm-card';
import { redeemText } from 'src/cards/redeem-text';
import { noSlashCommandText } from 'src/cards/no-slash-command';
import { rewardsCard } from 'src/cards/rewards-card';
import { myPointsCard } from 'src/cards/mypoints-card';
import { RollbarLogger } from 'nestjs-rollbar';
import { tourCard1 } from 'src/cards/tour-card-1';
import { tourCard2 } from 'src/cards/tour-card-2';
import { tourCard3 } from 'src/cards/tour-card-3';
import { tourCard4 } from 'src/cards/tour-card-4';
import { getUserFeedbackCard as getUserFeedbackDialog } from 'src/cards/get-user-feedback-dialog';
import { getThanksMessageDialog } from 'src/cards/get-thanks-message-dialog';
import { FeedbackService } from '../feedback/feedback.service';

@Injectable()
export class ChatbotService {
  constructor(
    private _googleService: GoogleService,
    private _spaceService: SpaceService,
    private _userService: UserService,
    private _feedbackService: FeedbackService,
    private _rollbarLogger: RollbarLogger,
  ) {}
  async getResponse(req, res) {
    let data;
    console.log(req.body);
    let { message, type } = req.body;
    this._rollbarLogger.info(`Event Type: ${type}`);
    this._rollbarLogger.info(`Message: ${JSON.stringify(message)}`);
    switch (req.body.type) {
      case 'MESSAGE':
        if (message?.slashCommand) {
          data = await this.processSlashCommand(req);
        } else {
          data = await this.processMessage(req);
        }
        this._rollbarLogger.info(`Bot Response: ${JSON.stringify(data)}`);
        res.send(data);
        break;
      case 'ADDED_TO_SPACE':
        data = await this.processAddToSpaceEvent(req);
        this._rollbarLogger.info(`Bot Response: ${JSON.stringify(data)}`);
        res.send(data);
        break;
      case 'CARD_CLICKED':
        data = await this.processCardClickedEvent(req.body);
        this._rollbarLogger.info(`Bot Response: ${JSON.stringify(data)}`);
        console.log('Response received');
        console.log(data);
        res.send(data);
        break;
      default:
        break;
    }
  }

  async processAddToSpaceEvent(req) {
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
        name: req.body.space?.displayName
          ? req.body.space.displayName
          : req.body.user.displayName,
        type: type,
      };
      await this._spaceService.create(data);
      space = await this._spaceService.findOne({
        _id: req.body.space.name,
      });
    }
    await this._googleService.getSpaceMembers(req.body.space.name);

    let card: any = welcomeCard();
    if (space.type == 'DM') {
      card = welcomeDMCard(req.body.user.displayName);
    }
    console.log(JSON.stringify(card));
    return card;
  }
  async processSlashCommand(req): Promise<any> {
    let data;
    let { type, message } = req.body;
    const spaceType = req.body.space.type;
    const sender = message.sender.displayName;
    switch (parseInt(message.slashCommand.commandId)) {
      case 1: // /mypoint
        if (spaceType == 'DM') {
          data = await this.getUserRewardPoint(sender);
        } else {
          data = addToChatCard();
        }
        break;
      case 2: // /help
        data = helpCard();
        break;
      case 3: //redeem
        data = redeemText();
        break;
      default:
        data = noSlashCommandText();
    }
    return data;
  }

  async processMessage(req) {
    let data;
    console.log(req.body);
    let { message } = req.body;
    if (this.isValidRewardMessage(message.argumentText)) {
      let messageId = message.name;

      //await this._googleService.deleteMessage(messageId);

      const response = await this.calculateRewardPoint(req);

      if (!response?.error) {
        const sender = req.body.message.sender.displayName;
        const image = req.body.message.sender.avatarUrl;
        const text = req.body.message.argumentText;
        data = this.createMessage(text, sender);
      } else {
        data = {
          text: response.error,
        };
      }
    } else {
      data = validationText();
    }
    return data;
  }

  createMessage(text, sender) {
    let rewardpt = this.getRewardPoint(text);
    let receiver = this.getReceiver(text);
    let response: any = helpCard();

    if (rewardpt !== null && receiver !== null) {
      let card = rewardsCard(receiver, rewardpt, sender, text);
      return card;
    }

    return response;
  }

  getRewardPoint(text) {
    const regex = /\+(\d+)/;
    const match = text.match(regex);

    if (match && match.length > 1) {
      const rewardPoint = match[1];
      return rewardPoint;
    } else {
      return null;
    }
  }

  getReceiver(text) {
    const regex = /@(\w+(\s+\w+))\b/;
    const match = text.match(regex);

    if (match && match.length > 1) {
      const receiver = match[1];
      return receiver;
    } else {
      return null;
    }
  }

  async getUserRewardPoint(user) {
    let userDetails = await this._userService.findOne({ displayName: user });
    let card = myPointsCard(userDetails);
    return card;
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
    const text = req.body.message.argumentText;
    let rewardpt = this.getRewardPoint(text);
    let receiverName = this.getReceiver(text);

    let sender = await this._userService.findOne({ displayName: senderName });
    if (!sender) {
      await this._userService.create({
        _id: req.body.message.sender.name,
        space: req.body.message.space.name,
        displayName: req.body.message.sender.displayName,
      });
      sender = await this._userService.findOne({ displayName: senderName });
    }
    if (sender.credits >= rewardpt) {
      let receiver = await this._userService.findOne({
        displayName: receiverName,
      });
      if (!receiver) {
        await this._googleService.getSpaceMembers(req.body.message.space.name);
        receiver = await this._userService.findOne({
          displayName: receiverName,
        });
      }

      await this.updateCredit(sender, rewardpt);
      await this.updateReward(receiver, rewardpt);
      return {
        status: 'success',
      };
    } else {
      return {
        status: 'fail',
        error:
          "Sorry! You don't have sufficient credit points to send rewards. Please check your available credits by sending /mypoint in the direct chat with bot.",
      };
    }
  }

  async updateCredit(sender, rewardSent) {
    let credits = sender.credits - rewardSent;
    await this._userService.findByIdAndUpdate(sender._id, { credits: credits });
  }

  async updateReward(receiver, rewardReceived) {
    let rewards = receiver.rewards + parseInt(rewardReceived);
    await this._userService.findByIdAndUpdate(receiver._id, {
      rewards: rewards,
    });
  }

  async processCardClickedEvent(reqBody) {
    const { space, user, action } = reqBody;
    console.log(action);
    let card;
    if (space.type == 'DM' && action?.actionMethodName == 'getTourCard') {
      switch (action.parameters[0].value) {
        case '1':
          card = tourCard1();
          break;
        case '2':
          card = tourCard2();
          break;
        case '3':
          card = tourCard3();
          break;
        case '4':
          card = tourCard4();
          break;
        // case '5':
        //   card = getUserFeedbackCard();
        //   break;
        default:
          break;
      }
    } else if (
      space.type == 'DM' &&
      action?.actionMethodName == 'getUserFeedback'
    ) {
      card = getUserFeedbackDialog();
    } else if (
      space.type == 'DM' &&
      action?.actionMethodName == 'saveFeedback'
    ) {
      let userId = reqBody.user.name;
      let user = await this._userService.findOne({ _id: userId });
      let userFeedback =
        reqBody.common.formInputs.feedback.stringInputs.value[0];

      if (user) {
        console.log('inside savefeedback');
        let response = await this._feedbackService.create({
          user: user._id,
          feedback: userFeedback,
        });

        console.log(response);
      }

      card = getThanksMessageDialog();
    } else {
      card = null;
    }
    return card;
  }
}
