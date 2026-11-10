import { CreateOfferDto } from '../dto/index.js';
import { OfferDocument } from './offer.model.js';
import {UpdateOfferDto} from '../dto/update-offer.dto.js';
import {City} from '../../types/index.js';

export interface IOfferService {
  create(dto: CreateOfferDto, userId: string): Promise<OfferDocument>;
  findById(id: string): Promise<OfferDocument | null>;
  findMany(count?: number): Promise<OfferDocument[]>;
  deleteById(offerId: string): Promise<OfferDocument | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<OfferDocument | null>;
  findPremiumByCity(city: City): Promise<OfferDocument[]>;
  incCommentCount(offerId: string): Promise<OfferDocument | null>;
  exists(documentId: string): Promise<boolean>;
  recalculateRating(offerId: string): Promise<OfferDocument | null>;
}
