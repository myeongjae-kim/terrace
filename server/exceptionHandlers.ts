import { ErrorRequestHandler } from "express-serve-static-core";
import { blogExceptionHandler } from "src/blog/exceptions";
import { dailyExceptionHandler } from "src/daily/exceptions";

export const exceptionHandlers: ErrorRequestHandler[] = [
  blogExceptionHandler,
  dailyExceptionHandler,
];