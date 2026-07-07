import { createRoute } from "@hono/zod-openapi";
import { apiErrorSchema } from "#/api/config/ApiError";
import { Controller } from "#/api/config/Controller";
import { validateQuery } from "#/api/config/validation";
import { musingListResponseSchema, paginationQuerySchema } from "#/api/schemas";
import { applicationContext } from "#/core/config/applicationContext";

const controller = Controller();

const route = createRoute({
  method: "get",
  path: "/musings",
  middleware: [validateQuery(paginationQuerySchema)] as const,
  request: {
    query: paginationQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: musingListResponseSchema,
        },
      },
      description: "Musing list",
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
  tags: ["musings"],
});

controller.openapi(route, async (c) => {
  const query = c.req.valid("query");
  const result = await applicationContext()
    .get("ListMusingsUseCase")
    .list(query);

  return c.json(musingListResponseSchema.parse(result), 200);
});

export default controller;
