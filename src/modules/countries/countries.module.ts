import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/database/entities/country.entity';
import { Job } from 'src/database/entities/jobs.entity';
import { Services } from 'src/utils/constants';
import { CountriesService } from './services/countries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Job])],
  exports: [{ provide: Services.COUNTRIES, useClass: CountriesService }],
  providers: [{ provide: Services.COUNTRIES, useClass: CountriesService }],
})
export class CountriesModule {}
