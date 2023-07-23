import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/lib/database.types';

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
  const supabase = createMiddlewareClient<Database>({ req, res });
  const { data } = await supabase.auth.getSession();

  if (
    data.session?.user?.role !== 'owner' &&
    ownerOnlyPaths.some((fn) => fn(req.nextUrl.pathname))
  ) {
    return NextResponse.redirect(new URL(req.url).origin + '/404');
  }

  return res;
}
