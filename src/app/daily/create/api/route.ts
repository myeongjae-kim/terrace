import { NextRequest } from 'next/server';
import { Article } from '@/app/common/domain/model/Article';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';

export async function POST(request: NextRequest) {
  const adapter = createArticlePersistenceAdapter();
  const isOwner = await adapter.isOwner();

  if (!isOwner) {
    return new Response('Unauthorized', { status: 401 });
  }

  const requestBody = (await request.json()) as Pick<Article, 'seq' | 'title' | 'content' | 'slug'>;

  const article = await adapter.getBySlug({
    category: 'DAILY_ARTICLE',
    slug: requestBody.slug,
  });

  if (article.id) {
    return new Response('slug already existed', { status: 400 });
  }

  await adapter.create({ ...requestBody, category: 'DAILY_ARTICLE' } as unknown as Article);

  return new Response(null, {
    status: 201,
  });
}
