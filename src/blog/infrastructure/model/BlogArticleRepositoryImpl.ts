import Optional from "optional-js";
import { BlogArticle, BlogArticleRepository } from "src/blog/domain/model";
import { EntityRepository, getConnection, Repository } from "typeorm";

export const createBlogArticleRepositoryImpl = () => {
  const conn = getConnection();
  return conn.getCustomRepository(BlogArticleRepositoryImpl);
}

@EntityRepository(BlogArticle)
class BlogArticleRepositoryImpl extends Repository<BlogArticle> implements BlogArticleRepository {
  public findAllByOrderBySeqDesc = (): Promise<BlogArticle[]> =>
    this.createQueryBuilder("blog_article")
      .orderBy("blog_article.seq", "DESC")
      .getMany();

  public findBySlug = (slug: string): Promise<Optional<BlogArticle>> =>
    this.createQueryBuilder("blog_article")
      .where("blog_article.slug = :slug", { slug })
      .getOne()
      .then(Optional.ofNullable)

  public findFirstBySeqBeforeOrderBySeqDesc = (seq: number): Promise<Optional<BlogArticle>> =>
    this.createQueryBuilder("blog_article")
      .where("blog_article.seq < :seq", { seq })
      .orderBy("blog_article.seq", "DESC")
      .getOne()
      .then(Optional.ofNullable)

  public findFirstBySeqAfterOrderBySeqAsc = (seq: number): Promise<Optional<BlogArticle>> =>
    this.createQueryBuilder("blog_article")
      .where("blog_article.seq > :seq", { seq })
      .orderBy("blog_article.seq", "ASC")
      .getOne()
      .then(Optional.ofNullable)

}