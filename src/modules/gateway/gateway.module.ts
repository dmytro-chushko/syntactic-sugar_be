import { Module } from '@nestjs/common';
import { MessagesModule } from '../messages/messages.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [MessagesModule],
  exports: [],
  providers: [AppGateway],
})
export class GatewayModule {}
