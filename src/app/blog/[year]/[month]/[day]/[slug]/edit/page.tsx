import ArticleFormContainer from '@/app/articles/ui/containers/ArticleFormContainer';
import { isOwner } from '@/app/auth/domain/application/isOwner';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { applicationContext } from '@/app/config/ApplicationContext';

export const dynamic = 'force-dynamic';

type Props = PageProps<{ slug: string }>;

const BlogArticleEditPage = async (props: Props) => {
  const params = await props.params;
  const article = await applicationContext.getBean('GetArticleBySlugUseCase').getBySlug({
    category: 'BLOG_ARTICLE',
    slug: params.slug,
    isOwner: await isOwner(),
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
