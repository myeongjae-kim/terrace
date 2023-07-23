import { GoogleLoginResponse } from '@/app/auth/domain/model/GoogleLoginResponse';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const requestBody: GoogleLoginResponse = await request.json();

  const supabase = createRouteHandlerClient<Database>({ cookies });
  await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: requestBody.credential,
  });

  return new Response(null, { status: 204 });
}
