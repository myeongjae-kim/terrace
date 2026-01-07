import ArticleFormContainer from '@/app/articles/ui/containers/ArticleFormContainer';
import { applicationContextAsync } from '@/app/config/ApplicationContext';

export const dynamic = 'force-dynamic';

const BlogArticleCreatePage = async () => {
  const applicationContext = await applicationContextAsync();

  const nextSeq = await applicationContext
    .get('GetNextSeqOfArticleUseCase')
    .getNextSeqOf({ category: 'BLOG_ARTICLE' });

  return (
    <ArticleFormContainer
      createOrEdit={'create'}
      seq={nextSeq + ''}
      slug={''}
      title={''}
      content={''}
      published_at={null}
      basePath="blog"
    />
  );
};

export default BlogArticleCreatePage;
