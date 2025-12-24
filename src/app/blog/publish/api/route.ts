import { NextRequest } from 'next/server';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import { revalidatePath } from 'next/cache';

export async function PATCH(request: NextRequest) {
  const requestBody = (await request.json()) as { slug: string };

  const adapter = createArticlePersistenceAdapter();

  await adapter.publish({
    category: 'BLOG_ARTICLE',
    slug: requestBody.slug,
  });

  revalidatePath('/blog');

  return new Response(null, {
    status: 200,
  });
}
