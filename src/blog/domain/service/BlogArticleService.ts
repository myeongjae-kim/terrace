import { BlogArticleDetailResponseDto, BlogArticleListResponseDto, BlogArticlePathDto, BlogArticleRequestDto } from "src/blog/api";

export interface BlogArticleService {
  findAll(): Promise<BlogArticleListResponseDto[]>;
  find(req: BlogArticlePathDto): Promise<BlogArticleDetailResponseDto>;
  update(req: BlogArticlePathDto, body: BlogArticleRequestDto): Promise<void>;
  create(body: BlogArticleRequestDto): Promise<string>;
  delete(req: BlogArticlePathDto): Promise<void>;
}