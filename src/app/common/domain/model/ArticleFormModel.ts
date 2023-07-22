import { z } from 'zod';

export const ArticleFormSchema = z.object({
  seq: z.number().int().positive(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/),
  content: z.string(),
});

export type ArticleFormModel = z.infer<typeof ArticleFormSchema>;
