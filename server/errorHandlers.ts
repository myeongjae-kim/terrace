import { ErrorRequestHandler } from "express-serve-static-core";
import { dailyExceptionHandler } from "src/daily/exceptions";

export const errorHandlers: ErrorRequestHandler[] = [
  dailyExceptionHandler
];