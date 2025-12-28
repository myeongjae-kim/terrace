'use server';

import { verifySession } from '@/app/auth/lib/session';
import { ENV } from '@/app/common/env';
import { cookies } from 'next/headers';

export const isOwner = async () => {
  const sessionToken = (await cookies()).get('session')?.value;
  if (!sessionToken) return false;
  const payload = await verifySession(sessionToken);
  return payload?.sub === ENV.OWNER_SUB;
};
