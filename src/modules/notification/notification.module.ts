import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Message, Notification } from 'src/database/entities';
import { Services } from 'src/utils/constants';
import { MessageModule } from 'src/modules/message/message.module';
import { MessageService } from 'src/modules/message/services/message.service';
import { ChatModule } from 'src/modules/chat/chat.module';
import { UserModule } from 'src/modules/user/user.module';
import { FreelancerModule } from 'src/modules/freelancer/freelancer.module';
import { EmployerModule } from 'src/modules/employer/employer.module';
import { NotificationController } from './controller/notification.controller';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, Message]),
    forwardRef(() => MessageModule),
    ChatModule,
    UserModule,
    JwtModule,
    FreelancerModule,
    EmployerModule,
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
