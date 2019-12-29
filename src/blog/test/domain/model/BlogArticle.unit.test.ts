import { BlogArticle } from "src/blog/domain/model/BlogArticle"
import { getSeoulDateFrom } from "src/util";
import { doesObjectHasNoUndefinedProperties, doesObjectHasNoUndefinedPropertiesExcept } from "src/util/test"

export const createBlogArticleFixture = (): BlogArticle => {
  const blogArticle = BlogArticle.from({
    seq: 1,
    createdAt: new Date('2019-12-29T13:28:03.601+09:00'),
    updatedAt: new Date('2019-12-29T13:28:03.601+09:00'),
    title: 'title',
    content: 'content',
    slug: "slug"
  })
  blogArticle.id = "1";

  return blogArticle;
}

describe('BlogArticle', () => {
  let blogArticle: BlogArticle;

  beforeEach(() => {
    blogArticle = createBlogArticleFixture();
  })

  it('is created by static factory method.', () => {
    // given
    const result = BlogArticle.from({
      seq: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'title',
      content: 'content',
      slug: 'slug'
    })

    // expect
    expect(doesObjectHasNoUndefinedPropertiesExcept(result, "id")).toBeTruthy();
    expect(result.seq).toBe(1);
    expect(result.title).toBe("title");
    expect(result.content).toBe("content");
    expect(result.slug).toBe("slug");
  });

  [
    ["2019", "12", "29"],
    ["2019", "12", "09"],
    ["2020", "01", "01"],
  ].forEach(args => {
    it('is matched with given date', () => {
      // given
      const year = args[0];
      const month = args[1];
      const day = args[2];

      // when
      blogArticle.createdAt = getSeoulDateFrom()
        .year(Number(year))
        .month(Number(month) - 1)
        .date(Number(day)).toDate();
      expect(getSeoulDateFrom(blogArticle.createdAt).format("YYYY.MM.DD")).toBe(args.join("."));

      // then
      expect(blogArticle.isDateMatched(year, month, day)).toBeTruthy();
    })
  });

  it('should return valid uri', () => {
    expect(blogArticle.getUri()).toBe("/blog/2019/12/29/slug")
  })
})

describe("createBlogArticleFixture", () => {
  it('should return valid object', () => {
    const blogArticle = createBlogArticleFixture();

    expect(doesObjectHasNoUndefinedProperties(blogArticle)).toBeTruthy();
  })
})