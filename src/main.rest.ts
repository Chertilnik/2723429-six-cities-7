import 'reflect-metadata';
import {Container} from 'inversify';
import {ILogger, PinoLogger} from './cli/shared/logger/index.js';
import {RestApplication} from './cli/rest/index.js';
import {IConfig, RestConfig, RestSchema} from './cli/shared/libs/config/index.js';
import {Component} from './cli/shared/types/index.js';


async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<IConfig<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
