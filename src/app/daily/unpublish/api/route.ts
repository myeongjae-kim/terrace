import { NextRequest } from 'next/server';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import { Article } from '@/app/common/domain/model/Article';

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
