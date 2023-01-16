import { Offer } from 'src/database/entities/offers.entity';
import { CreateOfferlDto } from 'src/modules/offer/dto/createOffer.dto';

export interface IOfferService {
  createOffer(createOfferDto: CreateOfferlDto): Promise<Offer>;
}
