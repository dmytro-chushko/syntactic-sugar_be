import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Chat, Message, User } from 'src/database/entities';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { Routes, Services } from 'src/utils/constants';
import { Auth } from 'src/utils/decorators/auth';
import { CreateChatDto } from 'src/modules/chat/dto/createChat.dto';
import { IChatService } from 'src/modules/chat//interfaces/IChatService';

@ApiTags('chat')
@Controller(Routes.CHAT)
export class ChatController {
  constructor(@Inject(Services.CHAT) private chatService: IChatService) {}

  @ApiBody({ type: CreateChatDto })
  @ApiResponse({ status: 200, description: 'Chat creation' })
  @UsePipes(ValidationPipe)
  @Post(Routes.CREATE_CHAT)
  createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.createChat(createChatDto);
  }

  @ApiQuery({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Get messages by chat id' })
  @UsePipes(ValidationPipe)
  @Get(Routes.GET_CHAT_MESSAGES)
  getChatMessages(@Param('id') id: string): Promise<Message[]> {
    return this.chatService.getChatMessages(id);
  }

  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  @ApiResponse({ status: 200, description: 'Get chats by user' })
  @Get(Routes.GET_CHATS_BY_USER)
  @UseGuards(AuthJwtGuard)
  getChatsByUser(@Auth() user: User): Promise<Chat[]> {
    return this.chatService.getChatsByUser(user);
  }
}
