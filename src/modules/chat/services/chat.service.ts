import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat, Message, User } from 'src/database/entities';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { IJobsService } from 'src/modules/jobs/interfaces/IJobService';
import { Services, UserRoles } from 'src/utils/constants';
import { CreateChatDto } from 'src/modules/chat/dto/createChat.dto';
import { GetChatByIdDto } from 'src/modules/chat/dto/getChatById.dto';
import { IChatService } from 'src/modules/chat/interfaces/IChatService';

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

      return await this.chatRepository.save(chat);
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
        const chats = await this.chatRepository
          .createQueryBuilder('chat')
          .leftJoinAndSelect('chat.employer', 'employer')
          .leftJoinAndSelect('chat.freelancer', 'freelancer')
          .leftJoinAndSelect('chat.job', 'job')
          .leftJoinAndSelect('chat.messages', 'messages')
          .leftJoinAndSelect('job.offers', 'offers')
          .leftJoinAndSelect('offers.freelancer', 'freelancerOffers')
          .where('employer.id = :id', { id: employer.id })
          .orderBy('chat.updatedAt', 'DESC')
          .addOrderBy('messages.createdAt', 'ASC')
          .getMany();

        return chats;
      } else {
        const freelancer = await this.freelancerService.getProfile(user);
        const chats = await this.chatRepository
          .createQueryBuilder('chat')
          .leftJoinAndSelect('chat.employer', 'employer')
          .leftJoinAndSelect('chat.freelancer', 'freelancer')
          .leftJoinAndSelect('chat.job', 'job')
          .leftJoinAndSelect('chat.messages', 'messages')
          .leftJoinAndSelect('job.offers', 'offers')
          .leftJoinAndSelect('offers.freelancer', 'freelancerOffers')
          .where('freelancer.id = :id', { id: freelancer.id })
          .orderBy('chat.updatedAt', 'DESC')
          .addOrderBy('messages.createdAt', 'ASC')
          .getMany();

        return chats;
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
