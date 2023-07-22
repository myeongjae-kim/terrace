import { createClient } from '@supabase/supabase-js';
import { ENV } from '@/app/common/env';

export const supabaseClient = createClient(
  ENV.NEXT_PUBLIC_SUPABASE_URL,
  ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } },
);
