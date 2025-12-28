import { z } from 'zod';

export const ArticleFormSchema = z.object({
  seq: z
    .string()
    .min(1)
    .max(14)
    .regex(/^[0-9]+$/),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/),
  originalSlug: z.string().optional(),
  content: z.string(),
  published_at: z.string().nullable(),
});

export type ArticleFormModel = z.infer<typeof ArticleFormSchema>;
