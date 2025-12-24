import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const ownerOnlyPaths: Array<(path: string) => boolean> = [
  (path) => /.*\/edit$/.test(path),
  (path) => /.*\/edit\/api$/.test(path),
  (path) => /.*\/create$/.test(path),
  (path) => /.*\/create\/api$/.test(path),
  (path) => /.*\/publish\/api$/.test(path),
  (path) => /.*\/unpublish\/api$/.test(path),
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Previously checked Supabase session. Now we assume no owner session.
  const isOwner = false;

  if (!isOwner && ownerOnlyPaths.some((fn) => fn(req.nextUrl.pathname))) {
    return NextResponse.redirect(new URL(req.url).origin + '/404');
  }

  return res;
}
