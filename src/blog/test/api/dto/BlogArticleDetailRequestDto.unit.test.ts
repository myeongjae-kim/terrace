import { BlogArticlePathDto } from "src/blog/api/dto";
import { doesObjectHasNoUndefinedProperties } from "src/util/test";

export const createBlogArticleDetatilRequestDtoFixture = (): BlogArticlePathDto => ({
  year: "1970",
  month: "01",
  day: "01",
  slug: "slug"
});

describe("createBlogArticleDetailRequestDtoFixture", () => {
  it("should return valid fixture", () => {
    expect(doesObjectHasNoUndefinedProperties(createBlogArticleDetatilRequestDtoFixture())).toBeTruthy();
  });
});