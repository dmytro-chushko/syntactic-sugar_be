import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/database/entities/country.entity';
import { Repository } from 'typeorm';
import { CreateCountryDto } from 'src/modules/countries/dto/createCountryDto';
import { ICountriesService } from 'src/modules/countries/interfaces/ICountriesService';

@Injectable()
export class CountriesService implements ICountriesService {
  constructor(@InjectRepository(Country) private readonly countryRepository: Repository<Country>) {}

  async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    const country = this.countryRepository.create(createCountryDto);

    return await this.countryRepository.save(country);
  }

  async getCountryByName(name: string): Promise<Country> {
    return await this.countryRepository.findOneBy({ name });
  }
}
