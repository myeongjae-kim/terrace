export type PaginationInput = {
  readonly limit?: number;
  readonly offset?: number;
};

export type NormalizedPagination = {
  readonly limit: number;
  readonly offset: number;
};

export type PaginatedResult<T> = {
  readonly items: readonly T[];
  readonly limit: number;
  readonly offset: number;
  readonly hasMore: boolean;
  readonly total?: number;
  readonly totalPages?: number;
};

export function normalizePagination(
  input: PaginationInput = {},
): NormalizedPagination {
  const limit = input.limit ?? 20;
  const offset = input.offset ?? 0;

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw new Error("limit은 1 이상 100 이하의 정수여야 합니다.");
  }

  if (!Number.isInteger(offset) || offset < 0) {
    throw new Error("offset은 0 이상의 정수여야 합니다.");
  }

  return { limit, offset };
}
