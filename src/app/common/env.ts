import { cleanEnv, str } from 'envalid';

export const ENV = cleanEnv(
  {
    NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID,
    GOOGLE_LOGIN_CLIENT_SECRET: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
    OWNER_SUB: process.env.OWNER_SUB,
  },
  {
    NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID: str(),
    // client일 떄만 optional
    GOOGLE_LOGIN_CLIENT_SECRET: str(typeof window !== 'undefined' ? { default: '' } : undefined),
    OWNER_SUB: str(),
  },
);
