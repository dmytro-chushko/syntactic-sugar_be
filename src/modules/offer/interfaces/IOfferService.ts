import { Offer } from 'src/database/entities/offers.entity';
import { CreateOfferDto } from 'src/modules/offer/dto/createOffer.dto';

export interface IOfferService {
  createOffer(createOfferDto: CreateOfferDto): Promise<Offer>;
}
