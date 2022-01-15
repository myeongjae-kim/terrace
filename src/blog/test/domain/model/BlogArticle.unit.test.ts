import {BlogArticle} from "src/blog/domain/model/BlogArticle";
import {getSeoulDateFrom} from "src/util";
import {doesObjectHasNoUndefinedProperties} from "src/util/test";

export const createBlogArticleFixture = (id = "1"): BlogArticle => {
  const blogArticle = BlogArticle.from({
    seq: 1,
    title: "title",
    content: "content",
    slug: "slug"
  });
  blogArticle.id = id;
  blogArticle.createdAt = "1970-01-01T00:00:00.000Z";
  blogArticle.updatedAt = "1970-01-01T00:00:00.000Z";


  return blogArticle;
};

describe("BlogArticle", () => {
  let blogArticle: BlogArticle;

  beforeEach(() => {
    blogArticle = createBlogArticleFixture();
  });

  it("is created by static factory method.", () => {
    // given
    const result = BlogArticle.from({
      seq: 1,
      title: "title",
      content: "content",
      slug: "slug"
    });

    // expect
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
    it("is matched with given date", () => {
      // given
      const year = args[0];
      const month = args[1];
      const day = args[2];

      // when
      blogArticle.createdAt = getSeoulDateFrom()
        .year(Number(year))
        .month(Number(month) - 1)
        .date(Number(day)).toISOString();
      expect(getSeoulDateFrom(blogArticle.createdAt).format("YYYY.MM.DD")).toBe(args.join("."));

      // then
      expect(blogArticle.isDateMatched(year, month, day)).toBeTruthy();
    });
  });

  it("should return valid uri", () => {
    blogArticle.createdAt = "1970-01-01T00:00:00.000Z";
    expect(blogArticle.getUri()).toBe("/blog/1970/01/01/slug");
  });

  it("should return empty value", () => {
    const empty = BlogArticle.empty();

    expect(empty.id).toBe("");
    expect(empty.seq).toBe(-1);
    expect(empty.createdAt).toBe("1970-01-01T00:00:00.000Z");
    expect(empty.updatedAt).toBe("1970-01-01T00:00:00.000Z");
    expect(empty.title).toBe("");
    expect(empty.content).toBe("");
    expect(empty.slug).toBe("");
  });

  it("is created by static factory method.", () => {
    // given
    const result = BlogArticle.from({
      seq: 1,
      title: "title",
      content: "content",
      slug: "slug"
    });

    const toUpdate = BlogArticle.from({
      seq: 2,
      title: "title2",
      content: "content2",
      slug: "slug2"
    });

    result.update(toUpdate);

    // expect
    expect(result.seq).toBe(2);
    expect(result.title).toBe("title2");
    expect(result.content).toBe("content2");
    expect(result.slug).toBe("slug2");
  });
});

describe("createBlogArticleFixture", () => {
  it("should return valid object", () => {
    const blogArticle = createBlogArticleFixture();

    expect(doesObjectHasNoUndefinedProperties(blogArticle)).toBeTruthy();
  });
});
