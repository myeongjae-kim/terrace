import { Article } from '@/app/articles/domain/Article';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const requestBody = (await request.json()) as Pick<Article, 'seq' | 'title' | 'content' | 'slug'>;

  const adapter = createArticlePersistenceAdapter();

  const article = await adapter.getBySlug({
    category: 'BLOG_ARTICLE',
    slug: requestBody.slug,
  });

  if (article.id) {
    return new Response('slug already existed', { status: 400 });
  }

  await adapter.create({ ...requestBody, category: 'BLOG_ARTICLE' } as Article);

  return new Response(null, {
    status: 201,
  });
}
