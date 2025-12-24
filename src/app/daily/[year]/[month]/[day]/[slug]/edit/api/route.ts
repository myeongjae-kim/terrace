import { NextRequest } from 'next/server';
import { Article } from '@/app/common/domain/model/Article';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';

export async function PUT(request: NextRequest) {
  const adapter = createArticlePersistenceAdapter();
  const isOwner = await adapter.isOwner();

  if (!isOwner) {
    return new Response('Unauthorized', { status: 401 });
  }

  const requestBody = (await request.json()) as Pick<
    Article,
    'seq' | 'title' | 'content' | 'slug'
  > & { originalSlug?: string };

  await adapter.update({ ...requestBody, category: 'DAILY_ARTICLE' } as unknown as Article);

  return new Response(null, {
    status: 200,
  });
}
