import ArticleFormContainer from '@/app/articles/ui/containers/ArticleFormContainer';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import { PageProps } from '@/app/common/nextjs/PageProps';

export const fetchCache = 'force-no-store';

type Props = PageProps<{ slug: string }>;

const BlogArticleEditPage = async (props: Props) => {
  const params = await props.params;
  const adapter = createArticlePersistenceAdapter();

  const article = await adapter.getBySlug({
    category: 'BLOG_ARTICLE',
    slug: params.slug,
  });

  return (
    <ArticleFormContainer
      createOrEdit={'edit'}
      seq={article.seq + ''}
      slug={article.slug}
      title={article.title}
      content={article.content}
      published_at={article.published_at}
      basePath="blog"
    />
  );
};

export default BlogArticleEditPage;
