import { ErrorRequestHandler } from "express-serve-static-core";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ApiError } from 'server/common/error/ApiError'
import { logger } from "server/common/utils";
import { UnauthorizedException } from ".";

export const authExceptionHandler: ErrorRequestHandler = (err: Error, _, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof UnauthorizedException) {
    res.status(401).send(new ApiError(401, "Unauthorized", err.message));
    logger.log('error', JSON.stringify(err.stack));
    return;
  }

  if (err instanceof TokenExpiredError) {
    res.status(401).send(new ApiError(401, "Unauthorized", err.message));
    logger.log('error', JSON.stringify(err.stack));
    return;
  }

  if (err instanceof JsonWebTokenError) {
    res.status(400).send(new ApiError(400, "Bad Request", err.message));
    logger.log('error', JSON.stringify(err.stack));
    return;
  }

  return next(err);
}