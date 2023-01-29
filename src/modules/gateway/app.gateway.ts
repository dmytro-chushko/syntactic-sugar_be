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
import { CreateMessageDto } from 'src/modules/message/dto/createMessage.dto';
import { IMessageService } from 'src/modules/message/interfaces/IMessageService';
import { INotificationService } from 'src/modules/notification/interfaces/INotificationService';
import { ChatIdDto } from './dto/chatId.dto';
import { MessageDto } from './dto/message.dto';
import { NotificationDto } from './dto/notification.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  constructor(
    @Inject(Services.MESSAGES) private readonly messagesService: IMessageService,
    @Inject(Services.NOTIFICATION) private readonly notificationService: INotificationService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(WS_EVENTS.MESSAGE)
  async handleMessage(@MessageBody() payload: CreateMessageDto): Promise<void> {
    const message: MessageDto = {
      ...payload,
      createdAt: new Date(),
    };
    await this.messagesService.createMessage(payload);
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

  @SubscribeMessage('notification')
  async handleNotification(@MessageBody() payload: NotificationDto): Promise<void> {
    const notifications = await this.notificationService.getNotificationsByRole(
      payload.id,
      payload.role,
    );
    this.server.emit('notification', notifications);
  }

  @SubscribeMessage('joinNotification')
  handleJoinNotification(
    @MessageBody('profileId') profileId: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(profileId);
  }

  @SubscribeMessage('liveNotification')
  handleLeaveNotification(
    @MessageBody('profileId') profileId: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.leave(profileId);
  }
}
