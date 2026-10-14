import {City} from './city.type.js';
import {HouseType} from './house-type.type.js';
import {Convenience} from './conveniences.type.js';
import {User} from './user.type.js';
import {Location} from './location.type.js';

export type RentalOffer = {
  name: string,
  description: string,
  date: Date,
  city: City,
  preimage: string,
  images: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  houseType: HouseType,
  roomsCount: number,
  guestsCount: number,
  price: number,
  conveniences: Convenience[],
  author: User,
  commentsCount: number,
  location: Location
}
