import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from 'src/database/entities/offers.entity';
import { Services } from 'src/utils/constants';
import { FreelancerModule } from '../freelancer/freelancer.module';
import { JobsModule } from '../jobs/jobs.module';
import { UserModule } from '../user/user.module';
import { OfferController } from './controllers/offer.controller';
import { OfferService } from './services/offer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), JobsModule, FreelancerModule, UserModule, JwtModule],
  exports: [],
  controllers: [OfferController],
  providers: [
    {
      provide: Services.OFFER,
      useClass: OfferService,
    },
  ],
})
export class OfferModule {}
