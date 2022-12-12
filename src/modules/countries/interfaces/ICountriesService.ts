import { Country } from 'src/database/entities/country.entity';
import { CreateCountryDto } from 'src/modules/countries/dto/createCountryDto';

export interface ICountriesService {
  createCountry(createCountryDto: CreateCountryDto): Promise<Country>;
  getCountryByName(name: string): Promise<Country>;
}
