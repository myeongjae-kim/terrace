import { formatDateTime, getSeoulDateFrom } from "src/util";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
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
    article.createdAt = new Date("1970-01-01T00:00:00.000Z");
    article.updatedAt = new Date("1970-01-01T00:00:00.000Z");

    return article;
  }

  @PrimaryGeneratedColumn()
  public id!: string;

  @Column()
  @Index("ux_blog_article_seq", { unique: true })
  public seq!: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @Column()
  public title!: string;

  @Column()
  @Index("ux_blog_article_slug", { unique: true })
  public slug!: string;

  @Column("text")
  public content!: string;
  public update({ seq, title, content, slug }: BlogArticle) {
    this.seq = seq;
    this.title = title;
    this.content = content;
    this.slug = slug;
  }

  public getUri = () => {
    return "/blog" + formatDateTime(this.createdAt, "/YYYY/MM/DD/") + this.slug;
  };

  public isDateMatched = (year: string, month: string, day: string) => {
    const date = getSeoulDateFrom(this.createdAt);
    return date.year() === Number(year) &&
      date.month() === (Number(month) - 1) &&
      date.date() === Number(day);
  };
}