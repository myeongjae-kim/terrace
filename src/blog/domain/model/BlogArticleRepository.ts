import Optional from "optional-js";
import { Repository } from "typeorm";
import { BlogArticle } from ".";

export interface BlogArticleRepository extends Repository<BlogArticle> {
  findAllByOrderBySeqDesc(): Promise<BlogArticle[]>
  findBySlug(slug: string): Promise<Optional<BlogArticle>>
  findFirstBySeqBeforeOrderBySeqDesc(seq: number): Promise<Optional<BlogArticle>>
  findFirstBySeqAfterOrderBySeqAsc(seq: number): Promise<Optional<BlogArticle>>
}