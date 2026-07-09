import { describe, expect, it } from "vitest";
import { normalizePagination } from "./Pagination";

describe("normalizePagination", () => {
  it("uses default limit and offset", () => {
    expect(normalizePagination()).toEqual({ limit: 20, offset: 0 });
  });

  it("accepts valid limit and offset", () => {
    expect(normalizePagination({ limit: 100, offset: 10 })).toEqual({
      limit: 100,
      offset: 10,
    });
  });

  it("rejects invalid limits", () => {
    expect(() => normalizePagination({ limit: 0 })).toThrow(
      "limit은 1 이상 100 이하의 정수여야 합니다.",
    );
    expect(() => normalizePagination({ limit: 101 })).toThrow(
      "limit은 1 이상 100 이하의 정수여야 합니다.",
    );
    expect(() => normalizePagination({ limit: 1.5 })).toThrow(
      "limit은 1 이상 100 이하의 정수여야 합니다.",
    );
  });

  it("rejects invalid offsets", () => {
    expect(() => normalizePagination({ offset: -1 })).toThrow(
      "offset은 0 이상의 정수여야 합니다.",
    );
    expect(() => normalizePagination({ offset: 1.5 })).toThrow(
      "offset은 0 이상의 정수여야 합니다.",
    );
  });
});
