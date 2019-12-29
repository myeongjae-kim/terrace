import { BlogArticleDetailRequestDto, BlogArticleDetailResponseDto, BlogArticleListResponseDto } from "src/blog/api";

export interface BlogArticleService {
  findAll(): Promise<BlogArticleListResponseDto[]>
  find(req: BlogArticleDetailRequestDto): Promise<BlogArticleDetailResponseDto>
}