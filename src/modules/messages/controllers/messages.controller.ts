import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Message } from 'src/database/entities';
import { Routes, Services } from 'src/utils/constants';
import { CreateMessageDto } from '../dto/createMessage.dto';
import { IMessageService } from '../interfaces/IMessageService';

@Controller('messages')
export class MessagesController {
  constructor(@Inject(Services.MESSAGES) private readonly messageService: IMessageService) {}

  @Post(Routes.CREATE_MESSAGE)
  createMessage(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageService.createMessage(createMessageDto);
  }

  @Get(Routes.GET_CHAT_MESSAGES)
  getChatMessages(@Param('id') id: string): Promise<Message[]> {
    return this.messageService.getChatMessages(id);
  }
}
