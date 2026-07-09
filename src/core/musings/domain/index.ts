import type { Brand, IsoDateTimeString } from "#/core/common/domain";

export type MusingId = Brand<string, "MusingId">;

export type Musing = {
  readonly id: MusingId;
  readonly quote: string | null;
  readonly from: string | null;
  readonly language: string | null;
  readonly createdAt: IsoDateTimeString | null;
  readonly updatedAt: IsoDateTimeString | null;
  readonly publishedAt: IsoDateTimeString | null;
  readonly createdById: number | null;
  readonly updatedById: number | null;
  readonly seq: number | null;
};

export type CreateMusingInput = {
  readonly quote?: string | null;
  readonly from?: string | null;
  readonly language?: string | null;
  readonly publishedAt?: Date | null;
  readonly createdById?: number | null;
  readonly updatedById?: number | null;
  readonly seq?: number | null;
};

export type UpdateMusingValues = {
  readonly quote?: string | null;
  readonly from?: string | null;
  readonly language?: string | null;
  readonly publishedAt?: Date | null;
  readonly createdById?: number | null;
  readonly updatedById?: number | null;
  readonly seq?: number | null;
};
