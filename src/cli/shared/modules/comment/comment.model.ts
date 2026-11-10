import { Schema, Document, model, Types } from 'mongoose';
import { Comment as CommentEntity } from '../../types/index.js';

export interface CommentDocument extends Omit<CommentEntity, 'author'>, Document {
  userId: Types.ObjectId;
  offerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<CommentDocument>({
  text: {
    type: String,
    required: true,
    minlength: [5, 'Min length for text is 5'],
    maxlength: [1024, 'Max length for text is 1024']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Min rating is 1'],
    max: [5, 'Max rating is 5']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  offerId: {
    type: Schema.Types.ObjectId,
    ref: 'Offer',
    required: true
  }
}, {
  timestamps: true,
});

export const CommentModel = model<CommentDocument>('Comment', commentSchema);
