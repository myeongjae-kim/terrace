import { createRoute } from "@hono/zod-openapi";
import { apiErrorSchema, notFound } from "#/api/config/ApiError";
import { Controller } from "#/api/config/Controller";
import { validateParams } from "#/api/config/validation";
import { articleIdParamSchema, articleSchema } from "#/api/schemas";
import type { ArticleId } from "#/core/article/domain";
import { applicationContext } from "#/core/config/applicationContext";

const controller = Controller();

const route = createRoute({
  method: "get",
  path: "/articles/{articleId}",
  middleware: [validateParams(articleIdParamSchema)] as const,
  request: {
    params: articleIdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: articleSchema,
        },
      },
      description: "Article detail",
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
      description: "Article not found",
    },
  },
  tags: ["articles"],
});

controller.openapi(route, async (c) => {
  const { articleId } = c.req.valid("param");

  if (Number(articleId) < 1) {
    throw notFound("Article not found");
  }

  const article = await applicationContext()
    .get("GetArticleUseCase")
    .get({ id: articleId as ArticleId });

  if (!article) {
    throw notFound("Article not found");
  }

  return c.json(articleSchema.parse(article), 200);
});

export default controller;
