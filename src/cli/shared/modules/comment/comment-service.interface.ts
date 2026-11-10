import {CreateCommentDto} from '../dto/create-comment.dto.js';
import {CommentDocument} from './comment.model.js';

export interface ICommentService {
  create(dto: CreateCommentDto): Promise<CommentDocument>;
  findByOfferId(offerId: string): Promise<CommentDocument[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
