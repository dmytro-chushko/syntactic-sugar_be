import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Services, WS_EVENTS } from 'src/utils/constants';
import { CreateMessageDto } from '../messages/dto/createMessage.dto';
import { IMessageService } from '../messages/interfaces/IMessageService';
import { ChatIdDto } from './dto/chatId.dto';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  constructor(@Inject(Services.MESSAGES) private readonly messagesService: IMessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(WS_EVENTS.MESSAGE)
  handleMessage(@MessageBody() payload: CreateMessageDto): void {
    const message: MessageDto = {
      ...payload,
      createdAt: new Date(),
    };
    this.messagesService.createMessage(payload);
    this.server.to(String(payload.chatId)).emit('message', message);
  }

  @SubscribeMessage(WS_EVENTS.JOIN)
  handleJoinChat(@MessageBody() payload: ChatIdDto, @ConnectedSocket() client: Socket): void {
    client.join(payload.chatId);
  }

  @SubscribeMessage(WS_EVENTS.LEAVE)
  handleLeaveChat(@MessageBody() payload: ChatIdDto, @ConnectedSocket() client: Socket): void {
    client.leave(payload.chatId);
  }
}
