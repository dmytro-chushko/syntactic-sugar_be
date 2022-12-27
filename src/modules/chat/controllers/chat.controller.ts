import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { Chat, Message, User } from 'src/database/entities';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { Routes, Services } from 'src/utils/constants';
import { Auth } from 'src/utils/decorators/auth';
import { CreateChatDto } from '../dto/createChat.dto';
import { IChatService } from '../interfaces/IChatService';

@Controller(Routes.CHAT)
export class ChatController {
  constructor(@Inject(Services.CHAT) private chatService: IChatService) {}

  @Post(Routes.CREATE_CHAT)
  createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.createChat(createChatDto);
  }

  @Get(Routes.GET_CHAT_MESSAGES)
  getChatMessages(@Param('id') id: string): Promise<Message[]> {
    return this.chatService.getChatMessages(id);
  }

  @Get(Routes.GET_CHATS_BY_USER)
  @UseGuards(AuthJwtGuard)
  getChatsByUser(@Auth() user: User): Promise<Chat[]> {
    return this.chatService.getChatsByUser(user);
  }
}
