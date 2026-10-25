import { Schema, Document, model, Types } from 'mongoose';
import {RentalOffer, Cities, HouseTypes, Conveniences} from '../../types/index.js';

export interface OfferDocument extends Omit<RentalOffer, 'author'>, Document {
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const offerSchema = new Schema<OfferDocument>({
  name: {
    type: String,
    required: true,
    minlength: [10, 'Min length for name is 10'],
    maxlength: [100, 'Max length for name is 100']
  },
  description: {
    type: String,
    required: true,
    minlength: [20, 'Min length for description is 20'],
    maxlength: [1024, 'Max length for description is 1024']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  city: {
    type: String,
    enum: Cities,
    required: true
  },
  preimage: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => v.length === 6,
      message: 'There must be exactly 6 images'
    }
  },
  isPremium: {
    type: Boolean,
    required: true,
    default: false
  },
  isFavorite: {
    type: Boolean,
    required: true,
    default: false
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Min rating is 1'],
    max: [5, 'Max rating is 5']
  },
  houseType: {
    type: String,
    enum: HouseTypes,
    required: true
  },
  roomsCount: {
    type: Number,
    required: true,
    min: [1, 'Min rooms is 1'],
    max: [8, 'Max rooms is 8']
  },
  guestsCount: {
    type: Number,
    required: true,
    min: [1, 'Min guests is 1'],
    max: [10, 'Max guests is 10']
  },
  price: {
    type: Number,
    required: true,
    min: [100, 'Min price is 100'],
    max: [100000, 'Max price is 100000']
  },
  conveniences: {
    type: [String],
    enum: Conveniences,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  commentsCount: {
    type: Number,
    required: true,
    default: 0
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  }
}, {
  timestamps: true,
});

export const OfferModel = model<OfferDocument>('Offer', offerSchema);
