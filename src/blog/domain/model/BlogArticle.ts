import { formatDateTime, getSeoulDateFrom } from "src/util";

export class BlogArticle {

  public static from({
    seq,
    title,
    content,
    slug
  }: Pick<BlogArticle, "seq" | "title" | "content" | "slug">): BlogArticle {
    const article = new BlogArticle();
    article.seq = seq;
    article.title = title;
    article.content = content;
    article.slug = slug;

    return article;
  }

  public static empty() {
    const article = BlogArticle.from({
      seq: -1,
      title: "",
      content: "",
      slug: "",
    });
    article.id = "";
    article.createdAt = "1970-01-01T00:00:00.000Z";
    article.updatedAt = "1970-01-01T00:00:00.000Z";

    return article;
  }

  public id!: string;
  public seq!: number;
  public createdAt!: string;
  public updatedAt!: string;
  public title!: string;
  public slug!: string;

  public content!: string;
  public update({ seq, title, content, slug }: BlogArticle) {
    this.seq = seq;
    this.title = title;
    this.content = content;
    this.slug = slug;
  }

  public getUri = () => {
    return BlogArticle.createUri({createdAt: this.createdAt, slug: this.slug});
  };

  public isDateMatched = (year: string, month: string, day: string) => {
    const date = getSeoulDateFrom(this.createdAt);
    return date.year() === Number(year) &&
      date.month() === (Number(month) - 1) &&
      date.date() === Number(day);
  };

  public static createUri = ({createdAt, slug}: {createdAt: string, slug: string}) =>
    "/blog" + formatDateTime(createdAt, "/YYYY/MM/DD/") + slug;
}
