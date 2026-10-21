import {ILogger} from '../shared/logger/index.js';
import {IConfig, RestSchema} from '../shared/libs/config/index.js';
import {inject, injectable} from 'inversify';
import {Component} from '../shared/types/index.js';


@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<RestSchema>,
  ) {}

  public async init(): Promise<void> {
    this.logger.info('Application initialized');
    this.logger.info(`Get value from env $PORT: ${this.config.get('SALT')}`);
  }
}
