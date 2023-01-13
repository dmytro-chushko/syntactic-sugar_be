import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from 'src/database/entities';
import { Routes, Services } from 'src/utils/constants';
import { CreateMessageDto } from 'src/modules/message/dto/createMessage.dto';
import { IMessageService } from 'src/modules/message/interfaces/IMessageService';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(@Inject(Services.MESSAGES) private readonly messageService: IMessageService) {}

  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({ status: 200, description: 'Message creation' })
  @UsePipes(ValidationPipe)
  @Post(Routes.CREATE_MESSAGE)
  createMessage(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageService.createMessage(createMessageDto);
  }

  @ApiQuery({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Get messages by chat id' })
  @UsePipes(ValidationPipe)
  @Get(Routes.GET_CHAT_MESSAGES)
  getChatMessages(@Param('id') id: string): Promise<Message[]> {
    return this.messageService.getChatMessages(id);
  }
}
