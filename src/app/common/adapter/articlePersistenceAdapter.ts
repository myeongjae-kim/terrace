import { supabaseClient } from '@/app/common/adapter/remote-call/supabaseClient';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';

export const articlePersistenceAdapter = createArticlePersistenceAdapter(supabaseClient);
