import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message, Notification } from 'src/database/entities';
import { Services } from 'src/utils/constants';
import { MessageModule } from 'src/modules/message/message.module';
import { NotificationService } from './services/notification.service';
import { MessageService } from '../message/services/message.service';
import { ChatModule } from '../chat/chat.module';
import { NotificationController } from './controller/notification.controller';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, Message]),
    forwardRef(() => MessageModule),
    ChatModule,
    UserModule,
    JwtModule,
  ],
  exports: [{ provide: Services.NOTIFICATION, useClass: NotificationService }],
  controllers: [NotificationController],
  providers: [
    { provide: Services.NOTIFICATION, useClass: NotificationService },
    MessageService,
    NotificationService,
  ],
})
export class NotificationModule {}
