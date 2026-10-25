
import { CreateUserDto } from '../dto/index.js';
import {UserDocument} from './user.model.js';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<UserDocument>;
  findByEmail(email: string): Promise<UserDocument | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<UserDocument>;
}
