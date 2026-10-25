import { City, HouseType, Convenience, Location } from '../../types/index.js';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public date: Date;
  public city: City;
  public preimage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public houseType: HouseType;
  public roomsCount: number;
  public guestsCount: number;
  public price: number;
  public conveniences: Convenience[];
  public location: Location;
}
