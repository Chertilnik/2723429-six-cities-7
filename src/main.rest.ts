import 'reflect-metadata';
import {RestApplication} from './cli/rest/index.js';
import {Component} from './cli/shared/types/index.js';
import {createRestApplicationContainer} from './cli/rest/rest.container.js';
import {Container} from 'inversify';
import {createUserContainer} from './cli/shared/modules/user/index.js';
import {createOfferContainer} from './cli/shared/modules/offer/index.js';
import {createCommentContainer} from './cli/shared/modules/comment/index.js';


async function bootstrap() {
  const container = new Container();
  container.load(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer()
  );

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
