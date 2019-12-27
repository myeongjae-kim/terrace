import { ErrorRequestHandler } from "express-serve-static-core";
import { ApiError } from 'server/common/error/ApiError'
import { logger } from "server/common/utils";
import { DailyDetailNotFoundException } from ".";

export const dailyExceptionHandler: ErrorRequestHandler = (err: Error, _, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof DailyDetailNotFoundException) {
    res.status(400).send(new ApiError(400, "Bad Request", err.message));
    logger.log('error', JSON.stringify(err.stack));
    return;
  }

  return next(err);
}