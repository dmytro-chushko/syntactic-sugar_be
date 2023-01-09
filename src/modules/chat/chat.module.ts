import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, Employer, Freelancer, Job, Message } from 'src/database/entities';
import { Services } from 'src/utils/constants';
import { EmployerModule } from 'src/modules/employer/employer.module';
import { FreelancerModule } from 'src/modules/freelancer/freelancer.module';
import { JobsModule } from 'src/modules/jobs/jobs.module';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';

@Module({
  imports: [
    FreelancerModule,
    EmployerModule,
    JobsModule,
    TypeOrmModule.forFeature([Chat, Job, Freelancer, Employer, Message]),
  ],
  exports: [{ provide: Services.CHAT, useClass: ChatService }],
  controllers: [ChatController],
  providers: [{ provide: Services.CHAT, useClass: ChatService }],
})
export class ChatModule {}
