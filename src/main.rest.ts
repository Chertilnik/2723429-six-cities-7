import 'reflect-metadata';
import {RestApplication} from './cli/rest/index.js';
import {Component} from './cli/shared/types/index.js';
import {createRestApplicationContainer} from './cli/rest/rest.container.js';
import {Container} from 'inversify';
import {createUserContainer} from './cli/shared/modules/user/index.js';
import {createOfferContainer} from './cli/shared/modules/offer/offer.container.js';


async function bootstrap() {
  const container = new Container();
  container.load(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer()
  );

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
