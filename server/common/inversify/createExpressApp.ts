import * as bodyParser from 'body-parser';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import nextI18NextMiddleware from 'next-i18next/middleware';
import Optional from 'optional-js';
import { AuthProviderImpl } from 'src/auth/config/injectables';
import I18NService from 'src/common/domain/service/I18NService';
import { defaultErrorHandler } from "../error/DefaultErrorHandler";
import { NextApplication } from '../nextjs/NextApplication';
import { TYPES } from './types';

export const createExpressApp = (container: Container, errorHandlers?: ErrorRequestHandler[]) => new InversifyExpressServer(container, null, null, null, AuthProviderImpl)
  .setConfig((theApp) => {
    theApp.use(bodyParser.urlencoded({ extended: true }));
    theApp.use(bodyParser.json());

    theApp.use(nextI18NextMiddleware(I18NService));

  })
  .setErrorConfig((theApp) => {
    theApp.get("*", (req, res) => container.get<NextApplication>(TYPES.NextApplication).handle(req, res));

    Optional.ofNullable(errorHandlers)
      .map(handlers => handlers.forEach(h => theApp.use(h)));

    theApp.use(defaultErrorHandler);
  })
  .build();