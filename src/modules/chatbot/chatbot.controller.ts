import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { Request } from 'express';

@Controller('message')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async getResponse(@Req() req: Request, @Res() res: Response) {
    await this.chatbotService.getResponse(req, res);
  }
}
