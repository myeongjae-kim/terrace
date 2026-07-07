import { createRoute } from "@hono/zod-openapi";
import { apiErrorSchema, notFound } from "#/api/config/ApiError";
import { Controller } from "#/api/config/Controller";
import { validateParams } from "#/api/config/validation";
import { musingIdParamSchema, musingSchema } from "#/api/schemas";
import { applicationContext } from "#/core/config/applicationContext";
import type { MusingId } from "#/core/musings/domain";

const controller = Controller();

const route = createRoute({
  method: "get",
  path: "/musings/{musingId}",
  middleware: [validateParams(musingIdParamSchema)] as const,
  request: {
    params: musingIdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: musingSchema,
        },
      },
      description: "Musing detail",
    },
    400: {
      content: {
        "application/json": {
          schema: apiErrorSchema,
        },
      },
      description: "Invalid path parameters",
    },
    404: {
      content: {
        "application/json": {
          schema: apiErrorSchema,
        },
      },
      description: "Musing not found",
    },
  },
  tags: ["musings"],
});

controller.openapi(route, async (c) => {
  const { musingId } = c.req.valid("param");

  if (Number(musingId) < 1) {
    throw notFound("Musing not found");
  }

  const musing = await applicationContext()
    .get("GetMusingUseCase")
    .get({ id: musingId as MusingId });

  if (!musing) {
    throw notFound("Musing not found");
  }

  return c.json(musingSchema.parse(musing), 200);
});

export default controller;
