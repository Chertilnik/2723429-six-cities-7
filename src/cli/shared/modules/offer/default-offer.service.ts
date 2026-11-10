import { inject, injectable } from 'inversify';
import {Model, Types} from 'mongoose';
import { CreateOfferDto } from '../dto/index.js';
import { IOfferService } from './offer-service.interface.js';
import { OfferDocument } from './offer.model.js';
import {City, Component, SortType} from '../../types/index.js';
import {ILogger} from '../../logger/index.js';
import {UpdateOfferDto} from '../dto/update-offer.dto.js';
import {CommentDocument} from '../comment/index.js';


@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: Model<OfferDocument>,
    @inject(Component.CommentModel) private readonly commentModel: Model<CommentDocument>
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
    return this.offerModel.findById(id).populate('author').exec();
  }

  public async deleteById(offerId: string): Promise<OfferDocument | null> {
    await this.commentModel.deleteMany({ offerId }).exec();
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<OfferDocument | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('author')
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async incCommentCount(
    offerId: string
  ): Promise<OfferDocument | null> {
    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        { $inc: { commentsCount: 1 } },
        { new: true }
      )
      .exec();
  }

  public async findMany(count?: number): Promise<OfferDocument[]> {
    const limit = count ?? 60;
    return this.offerModel
      .find()
      .sort({ date: SortType.Down })
      .limit(limit)
      .populate('author')
      .exec();
  }

  public async findPremiumByCity(city: City): Promise<OfferDocument[]> {
    return this.offerModel
      .find({ city, isPremium: true })
      .sort({ date: SortType.Down })
      .limit(3)
      .populate('author')
      .exec();
  }

  public async recalculateRating(offerId: string): Promise<OfferDocument | null> {
    const result = await this.commentModel.aggregate([
      { $match: { offerId: new Types.ObjectId(offerId) } },
      { $group: { _id: null, avg: { $avg: '$rating' } } },
    ]);

    const avg = result[0]?.avg ?? 1;
    const rounded = Math.round(avg * 10) / 10;

    return this.offerModel
      .findByIdAndUpdate(offerId, { rating: rounded }, { new: true })
      .exec();
  }
}
