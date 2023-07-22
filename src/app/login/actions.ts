'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function redirectIfLoggedIn(redirectUri: string) {
  const supabase = createServerActionClient<Database>({ cookies });
  const session = await supabase.auth.getSession();

  if (session.data.session) {
    revalidatePath(redirectUri);
    redirect(redirectUri);
  }
}
