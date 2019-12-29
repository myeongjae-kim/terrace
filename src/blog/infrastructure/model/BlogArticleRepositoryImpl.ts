import Optional from "optional-js";
import { BlogArticle, BlogArticleRepository } from "src/blog/domain/model";
import { EntityRepository, getConnection, Repository } from "typeorm";

export const createBlogArticleRepositoryImpl = () => {
  const conn = getConnection();
  return conn.getCustomRepository(BlogArticleRepositoryImpl);
}

@EntityRepository(BlogArticle)
class BlogArticleRepositoryImpl extends Repository<BlogArticle> implements BlogArticleRepository {
  public findAllByOrderBySeqDesc = () => this.createQueryBuilder("blog_Article")
    .orderBy("blog_article.seq", "DESC")
    .getMany();

  public findBySlug = (slug: string) => this.createQueryBuilder("blog_article")
    .where("blog_article.slug = :slug", { slug })
    .getOne()
    .then(Optional.ofNullable)
}