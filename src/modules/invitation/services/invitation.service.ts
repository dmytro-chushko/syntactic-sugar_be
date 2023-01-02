import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation, User } from 'src/database/entities';
import { InvitationDto } from 'src/modules/invitation/dtos/invitation.dto';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { IJobsService } from 'src/modules/jobs/interfaces/IJobService';
import { Services } from 'src/utils/constants';
import { IEmployerService } from 'src/modules/employer/interfaces/IEmployerService';

@Injectable()
export class InvitationService implements InvitationService {
  constructor(
    @InjectRepository(Invitation) private readonly invitationRepository: Repository<Invitation>,
    @Inject(Services.JOBS) private readonly jobService: IJobsService,
    @Inject(Services.EMPLOYER) private readonly employerService: IEmployerService,
    @Inject(Services.FREELANCER) private readonly freelancerService: IFreelancerService,
  ) {}

  async sendInvitation(user: User, invitationDto: InvitationDto): Promise<Invitation> {
    try {
      const job = await this.jobService.getJobById(invitationDto.job_id);
      const freelancer = await this.freelancerService.getById(invitationDto.freelancer_id);

      const invitation = await this.invitationRepository.save({
        employer: user,
        job,
        freelancer,
      });

      return invitation;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
