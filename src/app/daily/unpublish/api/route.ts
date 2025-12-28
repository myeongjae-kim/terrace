import { Article } from '@/app/articles/domain/Article';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import { NextRequest } from 'next/server';

export async function PATCH(request: NextRequest) {
  const adapter = createArticlePersistenceAdapter();
  const isOwner = await adapter.isOwner();

  if (!isOwner) {
    return new Response('Unauthorized', { status: 401 });
  }

  const requestBody = (await request.json()) as Pick<Article, 'slug'>;
  await adapter.unpublish({ ...requestBody, category: 'DAILY_ARTICLE' } as Article);

  return new Response(null, {
    status: 200,
  });
}
