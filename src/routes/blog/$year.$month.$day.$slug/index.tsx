import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { createArticlePersistenceAdapter } from '@/domain/article/adapter/createArticlePersistenceAdapter';

const getBySlug = createServerFn()
  .inputValidator(
    z.object({
      slug: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const adapter = createArticlePersistenceAdapter();

    return adapter.getBySlug({
      category: 'BLOG_ARTICLE',
      slug: data.slug,
    });
  });

export const Route = createFileRoute('/blog/$year/$month/$day/$slug/')({
  component: RouteComponent,
  params: z.object({
    year: z.string(),
    month: z.string(),
    day: z.string(),
    slug: z.string(),
  }),
  loader: async ({ params }) => {
    return { article: getBySlug({ data: { slug: params.slug } }) };
  },
});

function RouteComponent() {
  const { article } = Route.useLoaderData();

  return <div>{JSON.stringify(article, null, 2)}</div>;
}
