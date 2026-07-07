import type { ErrorHandler } from "hono";
import { ApiError } from "./ApiError";

export const globalErrorHandler: ErrorHandler = (error, c) => {
  if (error instanceof ApiError) {
    return c.json({ message: error.message }, error.status);
  }

  console.error(error);
  return c.json({ message: "Internal server error" }, 500);
};
