import { Article } from '@/app/articles/domain/Article';
import { isOwner } from '@/app/auth/domain/application/isOwner';
import { applicationContext } from '@/app/config/ApplicationContext';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const owner = await isOwner();

  if (!owner) {
    return new Response('Unauthorized', { status: 401 });
  }

  const requestBody = (await request.json()) as Pick<Article, 'seq' | 'title' | 'content' | 'slug'>;

  const article = await applicationContext.get('GetArticleBySlugUseCase').getBySlug({
    category: 'DAILY_ARTICLE',
    slug: requestBody.slug,
    isOwner: owner,
  });

  if (article.id) {
    return new Response('slug already existed', { status: 400 });
  }

  await applicationContext
    .get('CreateArticleUseCase')
    .create({ ...requestBody, category: 'DAILY_ARTICLE' } as Article);

  return new Response(null, {
    status: 201,
  });
}
