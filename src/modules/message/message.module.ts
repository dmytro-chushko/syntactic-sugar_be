import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, Message } from 'src/database/entities';
import { Services } from 'src/utils/constants';
import { ChatModule } from 'src/modules/chat/chat.module';
import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';

@Module({
  imports: [ChatModule, TypeOrmModule.forFeature([Message, Chat])],
  exports: [{ provide: Services.MESSAGES, useClass: MessageService }],
  controllers: [MessageController],
  providers: [{ provide: Services.MESSAGES, useClass: MessageService }],
})
export class MessageModule {}
