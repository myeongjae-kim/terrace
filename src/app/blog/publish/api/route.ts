import { isOwner } from '@/app/auth/domain/application/isOwner';
import { applicationContext } from '@/app/config/ApplicationContext';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function PATCH(request: NextRequest) {
  if (!(await isOwner())) {
    return new Response('Unauthorized', { status: 401 });
  }

  const requestBody = (await request.json()) as { slug: string };

  await applicationContext().get('PublishArticleUseCase').publish({
    slug: requestBody.slug,
  });

  revalidatePath('/blog');

  return new Response(null, {
    status: 200,
  });
}
