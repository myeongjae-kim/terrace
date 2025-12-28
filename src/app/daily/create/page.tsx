import ArticleFormContainer from '@/app/articles/ui/containers/ArticleFormContainer';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';

export const fetchCache = 'force-no-store';

const DailyArticleCreatePage = async () => {
  const adapter = createArticlePersistenceAdapter();

  const nextSeq = await adapter.getNextSeq({ category: 'DAILY_ARTICLE' });

  return (
    <ArticleFormContainer
      createOrEdit={'create'}
      seq={nextSeq + ''}
      slug={''}
      title={''}
      content={''}
      published_at={null}
      basePath="daily"
    />
  );
};

export default DailyArticleCreatePage;
