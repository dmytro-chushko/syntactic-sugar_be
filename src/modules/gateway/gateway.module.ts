import { Module } from '@nestjs/common';
import { MessageModule } from 'src/modules/message/message.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [MessageModule],
  exports: [],
  providers: [AppGateway],
})
export class GatewayModule {}
