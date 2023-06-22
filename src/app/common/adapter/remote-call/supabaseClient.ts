import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(
  'https://api.myeongjae.kim',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg1OTc3MjAwLAogICAgImV4cCI6IDE4NDM4MzAwMDAKfQ.PZ7wIeLCIOnTS9hDoeXuxT-EzXn4aO4f_6h5s91eg_g',
);
