import {User} from './user.type.js';

export type MockServerData = {
  titles: string[],
  descriptions: string[],
  preimages: string[],
  images: string[],
  authorEmails: string[],
  authors: User[]
};
