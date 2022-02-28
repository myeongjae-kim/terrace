import {Daily} from "src/daily/domain/Daily";

describe("Daily", () => {
  test("createUri", () => {
    const createdAt = "1970-01-01T00:00:00.000Z";
    const slug = "slug";
    expect(Daily.createUri({createdAt, slug})).toBe("/daily/1970/01/01/slug");
  });
});
