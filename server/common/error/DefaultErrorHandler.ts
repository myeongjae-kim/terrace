import { AssertionError } from "assert-plus";
import { ErrorRequestHandler } from "express-serve-static-core";
import { logger } from "../utils";
import { ApiError } from "./ApiError";

export const defaultErrorHandler: ErrorRequestHandler = (err: Error, _, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof AssertionError) {
    res.status(400).send(new ApiError(400, "Bad Request", err.message));
  }

  res.status(500).send(err.stack);
  logger.log('error', JSON.stringify(err.stack));
}