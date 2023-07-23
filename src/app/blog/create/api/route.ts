import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { Article } from '@/app/common/domain/model/Article';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';

export async function POST(request: NextRequest) {
  const requestBody = (await request.json()) as Pick<Article, 'seq' | 'title' | 'content' | 'slug'>;

  const supabase = createArticlePersistenceAdapter(createRouteHandlerClient<Database>({ cookies }));

  const article = await supabase.getBySlug({
    category: 'BLOG_ARTICLE',
    slug: requestBody.slug,
  });

  if (article.id) {
    return new Response('slug already existed', { status: 400 });
  }

  const result = await supabase.create({ ...requestBody, category: 'BLOG_ARTICLE' } as Article);

  return new Response(result.status < 400 ? null : JSON.stringify(result), {
    status: result.status,
    statusText: result.statusText,
  });
}
