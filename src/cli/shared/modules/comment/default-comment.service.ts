import { inject, injectable } from 'inversify';
import { ICommentService } from './comment-service.interface.js';
import { Component } from '../../types/index.js';
import {CommentDocument} from './comment.model.js';
import {CreateCommentDto} from '../dto/create-comment.dto.js';
import {Model} from 'mongoose';
import {IOfferService} from '../offer/index.js';

@injectable()
export class DefaultCommentService implements ICommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: Model<CommentDocument>,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {}

  public async create(dto: CreateCommentDto): Promise<CommentDocument> {
    const comment = await this.commentModel.create(dto);
    await this.offerService.incCommentCount(dto.offerId);
    await this.offerService.recalculateRating(dto.offerId);

    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<CommentDocument[]> {
    return this.commentModel
      .find({ offerId })
      .sort({ date: -1 })
      .limit(50)
      .populate('userId')
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
