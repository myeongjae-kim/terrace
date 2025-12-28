import { Article } from '@/app/articles/domain/Article';
import { isOwner } from '@/app/auth/domain/application/isOwner';
import { applicationContext } from '@/app/config/ApplicationContext';
import { NextRequest } from 'next/server';

export async function PUT(request: NextRequest) {
  const owner = await isOwner();

  if (!owner) {
    return new Response('Unauthorized', { status: 401 });
  }

  const requestBody = (await request.json()) as Pick<
    Article,
    'seq' | 'title' | 'content' | 'slug'
  > & { originalSlug?: string };

  await applicationContext
    .get('UpdateArticleUseCase')
    .update({ ...requestBody, category: 'DAILY_ARTICLE' } as unknown as Article);

  return new Response(null, {
    status: 200,
  });
}
