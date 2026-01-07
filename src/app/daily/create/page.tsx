import ArticleFormContainer from '@/app/articles/ui/containers/ArticleFormContainer';
import { applicationContextAsync } from '@/app/config/ApplicationContext';

export const dynamic = 'force-dynamic';

const DailyArticleCreatePage = async () => {
  const applicationContext = await applicationContextAsync();
  const nextSeq = await applicationContext
    .get('GetNextSeqOfArticleUseCase')
    .getNextSeqOf({ category: 'DAILY_ARTICLE' });

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
