import { Article } from '@/app/articles/domain/Article';
import { isOwner } from '@/app/auth/domain/application/isOwner';
import { applicationContext } from '@/app/config/ApplicationContext';
import { NextRequest } from 'next/server';

export async function PUT(request: NextRequest) {
  const requestBody = (await request.json()) as Pick<Article, 'seq' | 'title' | 'content' | 'slug'>;

  const article = await applicationContext()
    .get('GetArticleBySlugUseCase')
    .getBySlug({
      category: 'BLOG_ARTICLE',
      slug: requestBody.slug,
      isOwner: await isOwner(),
    });

  if (!article.id) {
    return new Response('Not Found', { status: 404 });
  }

  await applicationContext()
    .get('UpdateArticleUseCase')
    .update({ ...article, ...requestBody });

  return new Response(null, {
    status: 200,
  });
}
