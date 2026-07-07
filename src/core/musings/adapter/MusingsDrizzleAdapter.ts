import { asc, desc, eq, isNotNull } from "drizzle-orm";
import type { IsoDateTimeString } from "#/core/common/domain";
import type { PaginatedResult } from "#/core/common/model/Pagination";
import { normalizePagination } from "#/core/common/model/Pagination";
import type { MusingsCommandPort } from "#/core/musings/application/port/out/MusingsCommandPort";
import type { MusingsQueryPort } from "#/core/musings/application/port/out/MusingsQueryPort";
import type { Musing, MusingId } from "#/core/musings/domain";
import { db } from "#/db/index";
import { musingsTable } from "#/db/schema";

type MusingRow = typeof musingsTable.$inferSelect;
type MusingInsert = typeof musingsTable.$inferInsert;

function toNumericId(id: MusingId) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new Error("잘못된 id입니다.");
  }

  return numericId;
}

function toIsoDateTime(value: Date | null) {
  return (value ? value.toISOString() : null) as IsoDateTimeString | null;
}

function toMusing(row: MusingRow): Musing {
  return {
    id: String(row.id) as MusingId,
    quote: row.quote,
    from: row.from,
    language: row.language,
    createdAt: toIsoDateTime(row.createdAt),
    updatedAt: toIsoDateTime(row.updatedAt),
    publishedAt: toIsoDateTime(row.publishedAt),
    createdById: row.createdById,
    updatedById: row.updatedById,
    seq: row.seq,
  };
}

export class MusingsDrizzleAdapter
  implements MusingsCommandPort, MusingsQueryPort
{
  async create(input: Parameters<MusingsCommandPort["create"]>[0]) {
    const now = new Date();
    const [row] = await db
      .insert(musingsTable)
      .values({
        quote: input.quote ?? null,
        from: input.from ?? null,
        language: input.language ?? null,
        createdAt: now,
        updatedAt: now,
        publishedAt: input.publishedAt ?? null,
        createdById: input.createdById ?? null,
        updatedById: input.updatedById ?? null,
        seq: input.seq ?? null,
      })
      .returning();

    if (!row) {
      throw new Error("musing 생성에 실패했습니다.");
    }

    return toMusing(row);
  }

  async get(input: Parameters<MusingsQueryPort["get"]>[0]) {
    const [row] = await db
      .select()
      .from(musingsTable)
      .where(eq(musingsTable.id, toNumericId(input.id)))
      .limit(1);

    return row ? toMusing(row) : null;
  }

  async list(
    input?: Parameters<MusingsQueryPort["list"]>[0],
  ): Promise<PaginatedResult<Musing>> {
    const { limit, offset } = normalizePagination(input);
    const rows = await db
      .select()
      .from(musingsTable)
      .orderBy(desc(musingsTable.createdAt), desc(musingsTable.id))
      .limit(limit + 1)
      .offset(offset);

    return {
      items: rows.slice(0, limit).map(toMusing),
      limit,
      offset,
      hasMore: rows.length > limit,
    };
  }

  async listPublished(
    input?: Parameters<MusingsQueryPort["listPublished"]>[0],
  ): Promise<PaginatedResult<Musing>> {
    const { limit, offset } = normalizePagination(input);
    const rows = await db
      .select()
      .from(musingsTable)
      .where(isNotNull(musingsTable.publishedAt))
      .orderBy(asc(musingsTable.seq), asc(musingsTable.id))
      .limit(limit + 1)
      .offset(offset);

    return {
      items: rows.slice(0, limit).map(toMusing),
      limit,
      offset,
      hasMore: rows.length > limit,
    };
  }

  async update(input: Parameters<MusingsCommandPort["update"]>[0]) {
    const values: Partial<MusingInsert> = {
      updatedAt: new Date(),
    };

    if ("quote" in input.values) values.quote = input.values.quote ?? null;
    if ("from" in input.values) values.from = input.values.from ?? null;
    if ("language" in input.values)
      values.language = input.values.language ?? null;
    if ("publishedAt" in input.values) {
      values.publishedAt = input.values.publishedAt ?? null;
    }
    if ("createdById" in input.values) {
      values.createdById = input.values.createdById ?? null;
    }
    if ("updatedById" in input.values) {
      values.updatedById = input.values.updatedById ?? null;
    }
    if ("seq" in input.values) values.seq = input.values.seq ?? null;

    const [row] = await db
      .update(musingsTable)
      .set(values)
      .where(eq(musingsTable.id, toNumericId(input.id)))
      .returning();

    return row ? toMusing(row) : null;
  }

  async delete(input: Parameters<MusingsCommandPort["delete"]>[0]) {
    const rows = await db
      .delete(musingsTable)
      .where(eq(musingsTable.id, toNumericId(input.id)))
      .returning({ id: musingsTable.id });

    return rows.length > 0;
  }
}
