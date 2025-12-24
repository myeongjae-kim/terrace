import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const redirectUri = request.nextUrl.searchParams.get('redirectUri') || '/';

  const response = NextResponse.redirect(new URL(redirectUri, request.url));

  response.cookies.delete('session');

  return response;
}
