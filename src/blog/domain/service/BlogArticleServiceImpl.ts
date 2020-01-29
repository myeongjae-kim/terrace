import { inject, injectable } from "inversify";
import { TYPES } from "server/common/inversify/types";
import { BlogArticleDetailResponseDto, BlogArticleListResponseDto, BlogArticlePathDto, BlogArticleRequestDto, createBlogArticleDetailResponseDtoFrom, createBlogArticleListResponseDtoFrom } from "src/blog/api";
import { BlogArticleDetailNotFoundException } from "src/blog/exceptions";
import { getSeoulDateFrom } from "src/util";
import { BlogArticle } from "../model";
import { BlogArticleRepository } from "../model/BlogArticleRepository";
import { BlogArticleService } from "./BlogArticleService";

@injectable()
export class BlogArticleServiceImpl implements BlogArticleService {

  public constructor(
    @inject(TYPES.BlogArticleRepository) private blogArticleRepository: BlogArticleRepository
  ) { }

  public findAll = (): Promise<BlogArticleListResponseDto[]> => this.blogArticleRepository
    .findAllByOrderBySeqDesc()
    .then(d => d.map(createBlogArticleListResponseDtoFrom));

  public find = async (req: BlogArticlePathDto): Promise<BlogArticleDetailResponseDto> => {
    const current = await this.findByPath(req);

    const prev = (await this.blogArticleRepository.findFirstBySeqBeforeOrderBySeqDesc(current.seq))
      .orElseGet(BlogArticle.empty)
    const next = (await this.blogArticleRepository.findFirstBySeqAfterOrderBySeqAsc(current.seq))
      .orElseGet(BlogArticle.empty)

    return createBlogArticleDetailResponseDtoFrom({
      current,
      prev,
      next,
    });
  }

  public update = async (req: BlogArticlePathDto, body: BlogArticleRequestDto): Promise<void> => {
    const toUpdate = BlogArticle.from(body);
    const current = await this.findByPath(req);

    current.update(toUpdate);

    await this.blogArticleRepository.save(current);
  }

  public create = async (body: BlogArticleRequestDto): Promise<string> => {
    const toCreate = BlogArticle.from(body);

    return this.blogArticleRepository.save(toCreate)
      .then(a => '/blog/' + getSeoulDateFrom(a.createdAt).format("YYYY/MM/DD/") + a.slug);
  }

  public delete = async (req: BlogArticlePathDto): Promise<void> => {
    const id = (await this.findByPath(req)).id;

    await this.blogArticleRepository.delete(id);
  }

  private findByPath = async (req: BlogArticlePathDto): Promise<BlogArticle> => {
    const { year, month, day, slug } = req;

    return (await this.blogArticleRepository.findBySlug(slug))
      .filter(d => d.isDateMatched(year, month, day))
      .orElseThrow(() => new BlogArticleDetailNotFoundException(req)) as unknown as BlogArticle
  }
}