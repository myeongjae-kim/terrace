import { NextResponse } from 'next/server';
import { verifySession } from '@/app/auth/lib/session';
import { ENV } from '@/app/common/env';

import type { NextRequest } from 'next/server';

const ownerOnlyPaths: Array<(path: string) => boolean> = [
  (path) => /.*\/edit$/.test(path),
  (path) => /.*\/edit\/api$/.test(path),
  (path) => /.*\/create$/.test(path),
  (path) => /.*\/create\/api$/.test(path),
  (path) => /.*\/publish\/api$/.test(path),
  (path) => /.*\/unpublish\/api$/.test(path),
  (path) => /.*\/auth\/logout$/.test(path),
];

// List of paths that trigger a redirect to login if not authenticated
const protectedPages: Array<(path: string) => boolean> = [
  (path) => /.*\/edit$/.test(path),
  (path) => /.*\/create$/.test(path),
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const sessionToken = req.cookies.get('session')?.value;
  const payload = sessionToken ? await verifySession(sessionToken) : null;
  const isOwner = payload?.sub === ENV.OWNER_SUB;

  if (!isOwner && ownerOnlyPaths.some((fn) => fn(req.nextUrl.pathname))) {
    // If it's a page navigation, redirect to login
    if (protectedPages.some((fn) => fn(req.nextUrl.pathname))) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirectUri', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    // API or other restricted routes -> 404/403
    return NextResponse.redirect(new URL(req.url).origin + '/404');
  }

  return res;
}
