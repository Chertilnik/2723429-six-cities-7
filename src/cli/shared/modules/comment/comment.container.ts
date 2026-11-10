import { ContainerModule } from 'inversify';
import { Model } from 'mongoose';
import { Component } from '../../types/index.js';
import {CommentDocument, CommentModel} from './comment.model.js';
import {ICommentService} from './comment-service.interface.js';
import {DefaultCommentService} from './default-comment.service.js';

export function createCommentContainer(): ContainerModule {
  return new ContainerModule((options) => {
    options.bind<Model<CommentDocument>>(Component.CommentModel).toConstantValue(CommentModel);
    options.bind<ICommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  });
}
