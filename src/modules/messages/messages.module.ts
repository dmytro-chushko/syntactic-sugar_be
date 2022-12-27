import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, Message } from 'src/database/entities';
import { Services } from 'src/utils/constants';
import { ChatModule } from 'src/modules/chat/chat.module';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';

@Module({
  imports: [ChatModule, TypeOrmModule.forFeature([Message, Chat])],
  exports: [{ provide: Services.MESSAGES, useClass: MessagesService }],
  controllers: [MessagesController],
  providers: [{ provide: Services.MESSAGES, useClass: MessagesService }],
})
export class MessagesModule {}
