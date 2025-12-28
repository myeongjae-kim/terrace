import { Autowired } from '@/app/config/Autowired';
import { Component } from '@/app/config/Component';
import { ArticleCategory } from '../domain/ArticleCategory';
import { FindAllArticlesUseCase } from './port/in/FindAllArticlesUseCase';
import { GetArticleBySlugUseCase } from './port/in/GetArticleBySlugUseCase';
import { GetNextArticleUseCase } from './port/in/GetNextArticleUseCase';
import { GetNextSeqOfArticleUseCase } from './port/in/GetNextSeqOfArticleUseCase';
import { GetPrevArticleUseCase } from './port/in/GetPrevArticleUseCase';
import type { ArticleQueryPort } from './port/out/ArticleQueryPort';

@Component()
export class ArticleQueryService
  implements
    FindAllArticlesUseCase,
    GetArticleBySlugUseCase,
    GetNextArticleUseCase,
    GetNextSeqOfArticleUseCase,
    GetPrevArticleUseCase
{
  constructor(
    @Autowired('ArticleQueryPort')
    private readonly articleQueryPort: ArticleQueryPort,
  ) {}

  async getPrev(args: { category: ArticleCategory; seq: number; isOwner: boolean }) {
    return this.articleQueryPort.getPrev(args);
  }
  async getNextSeqOf(args: { category: ArticleCategory }) {
    return this.articleQueryPort.getNextSeqOf(args);
  }
  async getBySlug(args: { category: ArticleCategory; slug: string; isOwner: boolean }) {
    return this.articleQueryPort.getBySlug(args);
  }
  async getNext(args: { category: ArticleCategory; seq: number; isOwner: boolean }) {
    return this.articleQueryPort.getNext(args);
  }
  async findAll(args: {
    category: ArticleCategory;
    page: number;
    pageSize: number;
    isOwner: boolean;
  }) {
    return this.articleQueryPort.findAll(args);
  }
}
