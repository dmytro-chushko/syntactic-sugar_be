import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message, Notification } from 'src/database/entities';
import { Services } from 'src/utils/constants';
import { MessageModule } from 'src/modules/message/message.module';
import { NotificationService } from './services/notification.service';
import { MessageService } from '../message/services/message.service';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, Message]),
    forwardRef(() => MessageModule),
    ChatModule,
  ],
  exports: [{ provide: Services.NOTIFICATION, useClass: NotificationService }],
  controllers: [],
  providers: [
    { provide: Services.NOTIFICATION, useClass: NotificationService },
    MessageService,
    NotificationService,
  ],
})
export class NotificationModule {}
