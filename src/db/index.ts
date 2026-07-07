import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema.ts";

// biome-ignore lint/style/noNonNullAssertion: DB URL
export const db = drizzle(process.env.DATABASE_URL!, { schema });
