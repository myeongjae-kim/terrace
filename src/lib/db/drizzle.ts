import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { tryGetCloudflareEnv } from '../cloudflare/tryGetCloudflareEnv';
import * as schema from './schema';

export const createDatabaseClient = async () => {
  const hyperdriveConnectionString = await tryGetCloudflareEnv().then(
    (it) => it?.HYPERDRIVE?.connectionString,
  );

  if (!hyperdriveConnectionString) {
    if (!process.env.POSTGRES_URL) {
      throw new Error('POSTGRES_URL environment variable is not set');
    }
  }

  const url = hyperdriveConnectionString || process.env.POSTGRES_URL;
  const client = postgres(url!, {
    prepare: false, // serverless/edge에서 문제 회피용으로 자주 끔
  });
  return drizzle(client, { schema });
};

export type DatabaseClient = Awaited<ReturnType<typeof createDatabaseClient>>;
