import { Offer } from 'src/database/entities/offers.entity';
import { CreateOfferDto } from 'src/modules/offer/dto/createOffer.dto';
import { UpdateOfferDto } from '../dto/updateOffer.dto';

export interface IOfferService {
  createOffer(createOfferDto: CreateOfferDto): Promise<Offer>;
  updateOffer(updateOfferDto: UpdateOfferDto): Promise<void>;
}
