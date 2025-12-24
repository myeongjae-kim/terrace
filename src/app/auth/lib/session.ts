import { SignJWT, jwtVerify } from 'jose';
import { ENV } from '@/app/common/env';

type SessionPayload = {
  sub: string;
};

const secret = new TextEncoder().encode(ENV.JWT_SECRET);
const alg = 'HS256';

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('7d') // 7 days expiration
    .sign(secret);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: [alg],
    });
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}
