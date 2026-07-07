import { z } from "@hono/zod-openapi";

export const apiErrorSchema = z
  .object({
    message: z.string(),
  })
  .openapi("ApiError");

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 404 | 500 = 500,
  ) {
    super(message);
  }
}

export function notFound(message = "Not found") {
  return new ApiError(message, 404);
}
