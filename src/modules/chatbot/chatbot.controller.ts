import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { Request, Response } from 'express';

@Controller('message')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async getResponse(@Req() req: Request, @Res() res: Response) {
    await this.chatbotService.getResponse(req, res);
  }

  // @Post('send')
  // async sendMessage(@Req() req: Request, @Res() res: Response) {
  //   let response = await this.chatbotService.sendMessage(req);
  //   res.send(response);
  // }

  // @Post('delete')
  // async deleteMessage(@Req() req: Request, @Res() res: Response) {
  //   let response = await this.chatbotService.deleteMessage(req);
  //   res.send(response);
  // }
}
