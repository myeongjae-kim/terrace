import { verifySession } from '@/app/auth/lib/session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sessionToken = cookies().get('session')?.value;
  const payload = sessionToken ? await verifySession(sessionToken) : null;

  return NextResponse.json({
    isLoggedIn: !!payload,
  });
}
