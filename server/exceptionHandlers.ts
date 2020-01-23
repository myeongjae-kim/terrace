import { ErrorRequestHandler } from "express-serve-static-core";
import { authExceptionHandler } from "src/auth/exceptions";
import { blogExceptionHandler } from "src/blog/exceptions";
import { dailyExceptionHandler } from "src/daily/exceptions";

export const exceptionHandlers: ErrorRequestHandler[] = [
  blogExceptionHandler,
  dailyExceptionHandler,
  authExceptionHandler
];