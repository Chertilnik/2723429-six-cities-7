import { ContainerModule } from 'inversify'; // <-- Импортируем ContainerModule
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/index.js';
import { ILogger, PinoLogger } from '../shared/logger/index.js';
import { IConfig, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { IDatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';

export function createRestApplicationContainer(): ContainerModule {
  return new ContainerModule((options) => {
    options.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
    options.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
    options.bind<IConfig<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
    options.bind<IDatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  });
}
