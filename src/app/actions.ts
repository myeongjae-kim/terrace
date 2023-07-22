import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { cookies } from 'next/headers';

export async function isLoggedIn(): Promise<boolean> {
  const supabase = createServerActionClient<Database>({ cookies });
  const session = await supabase.auth.getSession();

  return !!session.data.session;
}
