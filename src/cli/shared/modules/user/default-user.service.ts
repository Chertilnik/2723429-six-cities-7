import { CreateUserDto } from '../dto/index.js';
import {IUserService} from './user-service.interface.js';
import {UserDocument} from './user.model.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {Model} from 'mongoose';
import {ILogger} from '../../logger/index.js';

@injectable()
export class DefaultUserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel) private readonly userModel: Model<UserDocument>
  ) {
  }

  public async create(dto: CreateUserDto, salt: string): Promise<UserDocument> {
    const user = new this.userModel(dto);
    user.setPassword(dto.password, salt);

    await user.save();
    this.logger.info(`User created: ${user.email}`);
    return user;
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<UserDocument> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }
}
