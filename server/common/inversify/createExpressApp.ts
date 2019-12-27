import * as bodyParser from 'body-parser';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import nextI18NextMiddleware from 'next-i18next/middleware';
import Optional from 'optional-js';
import I18NService from 'src/common/domain/service/I18NService';
import { defaultErrorHandler } from "../error/DefaultErrorHandler";
import { NextApplication } from '../nextjs/NextApplication';

export const createExpressApp = (container: Container, errorHandlers?: ErrorRequestHandler[]) => new InversifyExpressServer(container)
  .setConfig((theApp) => {
    theApp.use(bodyParser.urlencoded({ extended: true }));
    theApp.use(bodyParser.json());

    theApp.use(nextI18NextMiddleware(I18NService));

  })
  .setErrorConfig((theApp) => {
    theApp.get("*", (req, res) => new NextApplication().handle(req, res));

    Optional.ofNullable(errorHandlers)
      .map(handlers => handlers.forEach(h => theApp.use(h)));

    theApp.use(defaultErrorHandler);
  })
  .build();