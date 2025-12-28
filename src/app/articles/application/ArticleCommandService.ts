import { Autowired } from '@/app/config/Autowired';
import { Article } from '../domain/Article';
import { CreateArticleUseCase } from './port/in/CreateArticleUseCase';
import { PublishArticleUseCase } from './port/in/PublishArticleUseCase';
import { UnpublishArticleUseCase } from './port/in/UnpublishArticleUseCase';
import { UpdateArticleUseCase } from './port/in/UpdateArticleUseCase';
import type { ArticleCommandPort } from './port/out/ArticleCommandPort';

export class ArticleCommandService
  implements
    CreateArticleUseCase,
    PublishArticleUseCase,
    UnpublishArticleUseCase,
    UpdateArticleUseCase
{
  constructor(
    @Autowired('ArticleCommandPort')
    private readonly articleCommandPort: ArticleCommandPort,
  ) {}

  async create(article: Omit<Article, 'id'>) {
    return this.articleCommandPort.create(article);
  }

  async publish(args: { slug: string }) {
    return this.articleCommandPort.publish(args);
  }

  async unpublish(args: { slug: string }) {
    return this.articleCommandPort.unpublish(args);
  }

  async update(args: Omit<Article, 'id'> & { originalSlug?: string }) {
    return this.articleCommandPort.update(args);
  }
}
