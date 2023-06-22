import { SupabaseClient } from '@supabase/supabase-js';
import { supabaseClient } from '@/app/common/adapter/remote-call/supabaseClient';
import { Musing } from '@/app/musings/domain/model/Musing';

const createMusingPersistenceAdapter = (supabase: SupabaseClient) => {
  const findAll = async (): Promise<Musing[]> => {
    const { data: musings } = await supabase
      .from('musings')
      .select('id,seq,created_at,updated_at,quote,from,language')
      .order('seq', { ascending: true })
      .not('published_at', 'is', null);

    return musings || [];
  };

  return { findAll };
};

export const musingPersistenceAdapter = createMusingPersistenceAdapter(supabaseClient);
