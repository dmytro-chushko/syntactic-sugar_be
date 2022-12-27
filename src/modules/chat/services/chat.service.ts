import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat, Message, User } from 'src/database/entities';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { IJobsService } from 'src/modules/jobs/interfaces/IJobService';
import { Services, UserRoles } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { CreateChatDto } from '../dto/createChat.dto';
import { GetChatByIdDto } from '../dto/getChatById.dto';
import { IChatService } from '../interfaces/IChatService';

@Injectable()
export class ChatService implements IChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    @Inject(Services.FREELANCER) private readonly freelancerService: IFreelancerService,
    @Inject(Services.EMPLOYER) private readonly employerService: IEmployerService,
    @Inject(Services.JOBS) private readonly jobService: IJobsService,
  ) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    try {
      const employer = await this.employerService.getEmployerById(createChatDto.employerId);
      const freelancer = await this.freelancerService.getFreelancerById(createChatDto.freelancerId);
      const job = await this.jobService.getJobById(createChatDto.jobId);
      const chat = await this.chatRepository.create({
        freelancer,
        employer,
        job,
      });

      return chat;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getChatById(getChatByIdDto: GetChatByIdDto): Promise<Chat> {
    try {
      const chat = this.chatRepository.findOne({ where: { id: getChatByIdDto.id } });

      return chat;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getChatMessages(id: string): Promise<Message[]> {
    try {
      const chat = await this.chatRepository.findOne({ where: { id } });

      return chat.messages;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getChatsByUser(user: User): Promise<Chat[]> {
    try {
      if (user.role === UserRoles.EMPLOYER) {
        const employer = await this.employerService.getEmployer(user);

        return employer.chats;
      } else {
        const freelancer = await this.freelancerService.getProfile(user);

        return freelancer.chats;
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
