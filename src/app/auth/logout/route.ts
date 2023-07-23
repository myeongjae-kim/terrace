import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const session = await supabase.auth.getSession();

  if (session.data.session) {
    await supabase.auth.signOut();
  }

  const redirectUri = String(searchParams.get('redirectUri') || '/');
  revalidatePath(redirectUri);
  redirect(redirectUri);

  return new Response(null, {
    status: 201,
    headers: {
      Location: redirectUri,
    },
  });
}
