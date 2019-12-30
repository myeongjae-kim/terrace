import { createBlogArticleDetailResponseDtoFrom } from "src/blog/api/dto/BlogArticleDetailResponseDto";
import { doesObjectHasNoUndefinedProperties } from "src/util/test";
import { createBlogArticleFixture } from "../../domain/model/BlogArticle.unit.test"

describe('BlogArticleDetailResponseDto', () => {
  it('should return valid response dto.', () => {
    // given
    const current = createBlogArticleFixture("2");
    const prev = createBlogArticleFixture("1");
    const next = createBlogArticleFixture("3");

    // when
    const result = createBlogArticleDetailResponseDtoFrom({ current, prev, next });

    // then
    expect(doesObjectHasNoUndefinedProperties(result)).toBeTruthy();
    expect(doesObjectHasNoUndefinedProperties(result.prev)).toBeTruthy();
    expect(doesObjectHasNoUndefinedProperties(result.next)).toBeTruthy();

    expect(result.id).toBe("2");
    expect(result.prev.id).toBe("1");
    expect(result.next.id).toBe("3");
  })
})