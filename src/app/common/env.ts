import { cleanEnv, str } from 'envalid';

const isClient = typeof window !== 'undefined';

export const ENV = cleanEnv(
  {
    NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID,
    GOOGLE_LOGIN_CLIENT_SECRET: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
    OWNER_SUB: process.env.OWNER_SUB,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  {
    NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID: str(),
    // client일 떄만 optional
    GOOGLE_LOGIN_CLIENT_SECRET: str(isClient ? { default: '' } : undefined),
    OWNER_SUB: str(isClient ? { default: '' } : undefined),
    JWT_SECRET: str(isClient ? { default: '' } : undefined),
  },
);
