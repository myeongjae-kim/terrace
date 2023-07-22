import { cleanEnv, str } from 'envalid';

export const ENV = cleanEnv(
  {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  {
    NEXT_PUBLIC_SUPABASE_URL: str(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: str(),
  },
);
