import { inject, injectable } from 'inversify';
import { Model } from 'mongoose';
import { CreateOfferDto } from '../dto/index.js';
import { IOfferService } from './offer-service.interface.js';
import { OfferDocument } from './offer.model.js';
import { Component } from '../../types/index.js';
import {ILogger} from '../../logger/index.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: Model<OfferDocument>
  ) {}

  public async create(dto: CreateOfferDto, userId: string): Promise<OfferDocument> {
    const offer = new this.offerModel({
      ...dto,
      author: userId,
    });

    await offer.save();
    this.logger.info(`New offer created: ${offer.name} by user ${userId}`);
    return offer;
  }

  public async findById(id: string): Promise<OfferDocument | null> {
    return this.offerModel.findById(id).populate('author');
  }
}
