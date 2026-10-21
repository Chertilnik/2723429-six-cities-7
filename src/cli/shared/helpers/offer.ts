import {isCity, isConvenience, isHouseType, isUserType, RentalOffer} from '../types/index.js';

export function createOffer(offerData: string): RentalOffer {
  const [
    name, description, date, city, preimage, images,
    isPremium, isFavorite, rating, houseType,
    roomsCount, guestsCount, price, conveniences,
    authorName, authorEmail, authorPhotoUrl, authorPassword, authorType,
    location,
  ] = offerData.split('\t');

  const [latitude, longitude] = location.split(';').map(Number);

  return {
    name,
    description,
    date: new Date(date),
    city: isCity(city),
    preimage,
    images: images.split(',').map((img) => img.trim()),
    isPremium: isPremium.toLowerCase() === 'true',
    isFavorite: isFavorite.toLowerCase() === 'true',
    rating: Number.parseFloat(rating),
    houseType: isHouseType(houseType),
    roomsCount: Number.parseInt(roomsCount, 10),
    guestsCount: Number.parseInt(guestsCount, 10),
    price: Number.parseInt(price, 10),
    conveniences: conveniences.split(';').map((c) => isConvenience(c.trim())),
    author: {
      name: authorName,
      email: authorEmail,
      photoUrl: authorPhotoUrl,
      password: authorPassword,
      type: isUserType(authorType),
    },
    commentsCount: 0,
    location: { latitude, longitude },
  };
}
