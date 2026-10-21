import {OfferGenerator} from './offer-generator.interface.js';
import {Cities, CityLocation, Conveniences, HouseTypes, MockServerData} from '../../types/index.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../helpers/index.js';
import dayjs from 'dayjs';


const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const MIN_RATING = 1;
const MAX_RATING = 5;
const NUM_AFTER_DIGIT = 1;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 100000;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const titles = getRandomItem(this.mockData.titles);
    const descriptions = getRandomItem(this.mockData.descriptions);
    const date = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem(Cities);
    const preimage = getRandomItem(this.mockData.preimages);
    const images = getRandomItems(this.mockData.images, 6);
    const isPremium = getRandomItem([true, false]);
    const isFavorite = getRandomItem([true, false]);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, NUM_AFTER_DIGIT);
    const houseType = getRandomItem(HouseTypes);
    const roomsCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guestsCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const conveniences = getRandomItems(Conveniences).join(';');
    const {name, email, photoUrl, password, type} = getRandomItem(this.mockData.authors);
    const {latitude, longitude} = CityLocation[city];
    const location = `${latitude};${longitude}`;
    return [titles, descriptions, date, city, preimage, images, isPremium, isFavorite, rating, houseType,
      roomsCount, guestsCount, price, conveniences, name, email, photoUrl, password, type, location].join('\t');
  }
}
