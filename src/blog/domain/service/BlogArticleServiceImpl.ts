import { inject, injectable } from "inversify";
import { TYPES } from "server/common/inversify/types";
import { BlogArticleDetailRequestDto, BlogArticleDetailResponseDto, BlogArticleListResponseDto, createBlogArticleDetailResponseDtoFrom, createBlogArticleListResponseDtoFrom } from "src/blog/api";
import { BlogArticleDetailNotFoundException } from "src/blog/exceptions";
import { BlogArticle } from "../model";
import { BlogArticleRepository } from "../model/BlogArticleRepository";
import { BlogArticleService } from "./BlogArticleService";

@injectable()
export class BlogArticleServiceImpl implements BlogArticleService {

  public constructor(
    @inject(TYPES.BlogArticleRepository) private blogArticleRepository: BlogArticleRepository
  ) { }

  public findAll = (): Promise<BlogArticleListResponseDto[]> => this.blogArticleRepository.findAllByOrderBySeqDesc()
    .then(d => d.map(createBlogArticleListResponseDtoFrom));

  public find = async (req: BlogArticleDetailRequestDto): Promise<BlogArticleDetailResponseDto> => {
    const { year, month, day, slug } = req;
    const current = (await this.blogArticleRepository.findBySlug(slug))
      .filter(d => d.isDateMatched(year, month, day))
      .orElseThrow(() => new BlogArticleDetailNotFoundException(req)) as unknown as BlogArticle;

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
}