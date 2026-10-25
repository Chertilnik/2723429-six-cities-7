import { CreateOfferDto } from '../dto/index.js';
import { OfferDocument } from './offer.model.js';

export interface IOfferService {
  create(dto: CreateOfferDto, userId: string): Promise<OfferDocument>;
  findById(id: string): Promise<OfferDocument | null>;
}
