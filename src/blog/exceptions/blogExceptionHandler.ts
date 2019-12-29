import { ErrorRequestHandler } from "express-serve-static-core";
import { ApiError } from 'server/common/error/ApiError'
import { logger } from "server/common/utils";
import { BlogArticleDetailNotFoundException } from ".";

export const blogExceptionHandler: ErrorRequestHandler = (err: Error, _, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof BlogArticleDetailNotFoundException) {
    res.status(404).send(new ApiError(404, "Not Found", err.message));
    logger.log('error', JSON.stringify(err.stack));
    return;
  }

  return next(err);
}