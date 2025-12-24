import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { ENV } from '@/app/common/env';
import { signSession } from '@/app/auth/lib/session';
import { GoogleLoginResponse } from '@/app/auth/domain/model/GoogleLoginResponse';

const client = new OAuth2Client(ENV.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GoogleLoginResponse;
    const { clientId, credential } = body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.sub || payload.sub !== ENV.OWNER_SUB) {
      return new Response('Invalid token payload', { status: 400 });
    }

    const sessionToken = await signSession({ sub: payload.sub });

    const response = new NextResponse(null, { status: 200 });

    // Set 7-day expiration to match JWT
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
