import { createBlogArticleListResponseDtoFrom } from "src/blog/api";
import { doesObjectHasNoUndefinedProperties } from "src/util/test";
import { createBlogArticleFixture } from "../../domain/model/BlogArticle.unit.test"

export const createBlogArticleListResponseDtoFixture = () =>
  createBlogArticleListResponseDtoFrom(createBlogArticleFixture());

describe('createBlogArticleListResponseDtoFixture', () => {
  it('creates valid response dto', () => {
    expect(doesObjectHasNoUndefinedProperties(createBlogArticleListResponseDtoFixture())).toBeTruthy();
  })
})

describe('BlogArticleListResponseDto', () => {
  it('is created by converting function.', () => {
    // given
    const blogArticle = createBlogArticleFixture();

    // when
    const result = createBlogArticleListResponseDtoFrom(blogArticle);

    // then
    expect(doesObjectHasNoUndefinedProperties(result)).toBeTruthy();
  })
})