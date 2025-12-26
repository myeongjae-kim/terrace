import { db } from '@/lib/db/drizzle';
import { musings as musingsTable } from '@/lib/db/schema';
import { asc, isNotNull } from 'drizzle-orm';

const createMusingPersistenceAdapter = () => {
  const findAll = async () => {
    const results = await db
      .select({
        id: musingsTable.id,
        quote: musingsTable.quote,
        from: musingsTable.from,
        language: musingsTable.language,
      })
      .from(musingsTable)
      .where(isNotNull(musingsTable.published_at))
      .orderBy(asc(musingsTable.seq));

    return results.map((r) => ({
      id: r.id,
      quote: r.quote || '',
      from: r.from || '',
      language: (r.language as 'KO' | 'EN') || 'KO',
    }));
  };

  return { findAll };
};

export const musingPersistenceAdapter = createMusingPersistenceAdapter();
