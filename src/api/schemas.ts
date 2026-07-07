import { z } from "@hono/zod-openapi";

const isoDateTimeString = z.string().datetime();

export const paginationQuerySchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .optional()
    .openapi({
      example: 20,
      param: {
        in: "query",
        name: "limit",
      },
    }),
  offset: z.coerce
    .number()
    .int()
    .min(0)
    .optional()
    .openapi({
      example: 0,
      param: {
        in: "query",
        name: "offset",
      },
    }),
});

export const articleIdParamSchema = z.object({
  articleId: z
    .string()
    .regex(/^\d+$/)
    .openapi({
      example: "1",
      param: {
        in: "path",
        name: "articleId",
      },
    }),
});

export const musingIdParamSchema = z.object({
  musingId: z
    .string()
    .regex(/^\d+$/)
    .openapi({
      example: "1",
      param: {
        in: "path",
        name: "musingId",
      },
    }),
});

export const articleSchema = z
  .object({
    id: z.string(),
    category: z.string().nullable(),
    seq: z.number().int().nullable(),
    title: z.string().nullable(),
    slug: z.string().nullable(),
    content: z.string().nullable(),
    createdAt: isoDateTimeString.nullable(),
    updatedAt: isoDateTimeString.nullable(),
    publishedAt: isoDateTimeString.nullable(),
    userId: z.string().nullable(),
  })
  .openapi("Article");

export const articleListResponseSchema = z
  .object({
    items: z.array(articleSchema),
    limit: z.number().int(),
    offset: z.number().int(),
    hasMore: z.boolean(),
  })
  .openapi("ArticleListResponse");

export const musingSchema = z
  .object({
    id: z.string(),
    quote: z.string().nullable(),
    from: z.string().nullable(),
    language: z.string().nullable(),
    createdAt: isoDateTimeString.nullable(),
    updatedAt: isoDateTimeString.nullable(),
    publishedAt: isoDateTimeString.nullable(),
    createdById: z.number().int().nullable(),
    updatedById: z.number().int().nullable(),
    seq: z.number().int().nullable(),
  })
  .openapi("Musing");

export const musingListResponseSchema = z
  .object({
    items: z.array(musingSchema),
    limit: z.number().int(),
    offset: z.number().int(),
    hasMore: z.boolean(),
  })
  .openapi("MusingListResponse");
