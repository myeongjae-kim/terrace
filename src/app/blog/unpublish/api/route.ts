import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import { revalidatePath } from 'next/cache';

export async function PATCH(request: NextRequest) {
  const requestBody = (await request.json()) as { slug: string };

  const supabase = createArticlePersistenceAdapter(createRouteHandlerClient<Database>({ cookies }));

  const result = await supabase.unpublish({
    category: 'BLOG_ARTICLE',
    slug: requestBody.slug,
  });

  revalidatePath('/blog');

  return new Response(result.status < 400 ? null : JSON.stringify(result), {
    status: result.status,
    statusText: result.statusText,
  });
}
