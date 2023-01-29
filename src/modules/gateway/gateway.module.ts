import { Module } from '@nestjs/common';
import { MessageModule } from 'src/modules/message/message.module';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [MessageModule, NotificationModule],
  exports: [],
  providers: [AppGateway],
})
export class GatewayModule {}
