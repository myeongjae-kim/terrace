import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { Article } from '@/app/common/domain/model/Article';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';

export async function PUT(request: NextRequest) {
  const requestBody = (await request.json()) as Pick<Article, 'seq' | 'title' | 'content' | 'slug'>;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const article = await createArticlePersistenceAdapter(supabase).getBySlug({
    category: 'BLOG_ARTICLE',
    slug: requestBody.slug,
  });

  if (!article) {
    return new Response('Not Found', { status: 404 });
  }

  await supabase
    .from('article')
    .update({ ...article, ...requestBody })
    .eq('slug', requestBody.slug);

  return new Response('OK', { status: 200 });
}
