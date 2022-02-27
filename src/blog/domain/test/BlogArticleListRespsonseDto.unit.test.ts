import { doesObjectHasNoUndefinedProperties } from "src/util/test";
import { createBlogArticleFixture } from "./BlogArticle.unit.test";
import {createBlogArticleListResponseDtoFrom} from "src/blog/domain/BlogArticleListResponse";

export const createBlogArticleListResponseDtoFixture = () =>
  createBlogArticleListResponseDtoFrom(createBlogArticleFixture());

describe("createBlogArticleListResponseDtoFixture", () => {
  it("creates valid response dto", () => {
    expect(doesObjectHasNoUndefinedProperties(createBlogArticleListResponseDtoFixture())).toBeTruthy();
  });
});

describe("BlogArticleListResponseDto", () => {
  it("is created by converting function.", () => {
    // given
    const blogArticle = createBlogArticleFixture();

    // when
    const result = createBlogArticleListResponseDtoFrom(blogArticle);

    // then
    expect(doesObjectHasNoUndefinedProperties(result)).toBeTruthy();
  });
});
