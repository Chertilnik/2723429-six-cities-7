import * as Mongoose from 'mongoose';
import {IDatabaseClient} from './database-client.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {ILogger} from '../../logger/index.js';
import {retryOrConnect} from '../../helpers/index.js';

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
  ) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB is already connected');
    }
    try {
      this.logger.info('MongoDB is trying to connect');

      this.mongoose = await retryOrConnect(
        () => Mongoose.connect(uri),
        5,
        1000,
        (error, attempt) => {
          this.logger.error(`Failed to connect to MongoDB. Attempt ${attempt}`, error);
        }
      );
      this.isConnected = true;
      this.logger.info('MongoDB Connected successfully');
    } catch (e) {
      this.logger.error('MongoDB connection failed after all retries', e as Error);
      throw e;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('MongoDB is already disconnected');
    }
    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('MongoDB is disconnected');
  }
}
