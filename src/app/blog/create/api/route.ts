import { Article } from '@/app/articles/domain/Article';
import { isOwner } from '@/app/auth/domain/application/isOwner';
import { applicationContext } from '@/app/config/ApplicationContext';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const requestBody = (await request.json()) as Pick<Article, 'seq' | 'title' | 'content' | 'slug'>;

  const article = await applicationContext()
    .getBean('GetArticleBySlugUseCase')
    .getBySlug({
      category: 'BLOG_ARTICLE',
      slug: requestBody.slug,
      isOwner: await isOwner(),
    });

  if (article.id) {
    return new Response('slug already existed', { status: 400 });
  }

  await applicationContext()
    .getBean('CreateArticleUseCase')
    .create({ ...requestBody, category: 'BLOG_ARTICLE' } as Article);

  return new Response(null, {
    status: 201,
  });
}
