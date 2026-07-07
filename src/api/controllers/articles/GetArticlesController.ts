import { createRoute } from "@hono/zod-openapi";
import { apiErrorSchema } from "#/api/config/ApiError";
import { Controller } from "#/api/config/Controller";
import { validateQuery } from "#/api/config/validation";
import {
  articleListResponseSchema,
  paginationQuerySchema,
} from "#/api/schemas";
import { applicationContext } from "#/core/config/applicationContext";

const controller = Controller();

const route = createRoute({
  method: "get",
  path: "/articles",
  middleware: [validateQuery(paginationQuerySchema)] as const,
  request: {
    query: paginationQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: articleListResponseSchema,
        },
      },
      description: "Article list",
    },
    400: {
      content: {
        "application/json": {
          schema: apiErrorSchema,
        },
      },
      description: "Invalid query parameters",
    },
  },
  tags: ["articles"],
});

controller.openapi(route, async (c) => {
  const query = c.req.valid("query");
  const result = await applicationContext()
    .get("ListArticlesUseCase")
    .list(query);

  return c.json(articleListResponseSchema.parse(result), 200);
});

export default controller;
