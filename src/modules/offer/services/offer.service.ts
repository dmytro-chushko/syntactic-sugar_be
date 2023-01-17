import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from 'src/database/entities/offers.entity';
import { IFreelancerService } from 'src/modules/freelancer/interfaces/IFreelancerService';
import { IJobsService } from 'src/modules/jobs/interfaces/IJobService';
import { Services } from 'src/utils/constants';
import { CreateOfferDto } from 'src/modules/offer/dto/createOffer.dto';
import { IOfferService } from 'src/modules/offer/interfaces/IOfferService';

@Injectable()
export class OfferService implements IOfferService {
  constructor(
    @InjectRepository(Offer) private readonly offerRepository: Repository<Offer>,
    @Inject(Services.JOBS) private readonly jobService: IJobsService,
    @Inject(Services.FREELANCER) private readonly freelancerService: IFreelancerService,
  ) {}

  async createOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    try {
      const freelancer = await this.freelancerService.getFreelancerById(
        createOfferDto.freelancerId,
      );
      const job = await this.jobService.getJobById(createOfferDto.jobId);
      const offer = await this.offerRepository.save({
        hourRate: createOfferDto.hourRate,
        job,
        freelancer,
      });

      return offer;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
