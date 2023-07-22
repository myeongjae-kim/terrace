import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { cookies } from 'next/headers';

export async function GET() {
  const supabase = createServerActionClient<Database>({ cookies });
  const session = await supabase.auth.getSession();

  return new Response(JSON.stringify({ isLoggedIn: !!session.data.session }), { status: 200 });
}
