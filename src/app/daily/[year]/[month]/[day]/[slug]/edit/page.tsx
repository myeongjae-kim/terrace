import React from 'react';
import { PageProps } from '@/app/common/nextjs/PageProps';
import ArticleFormContainer from '@/app/common/containers/ArticleFormContainer';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';

export const fetchCache = 'force-no-store';

type Props = PageProps<{ slug: string }>;

const DailyArticleEditPage = async (props: Props) => {
  const params = await props.params;
  const adapter = createArticlePersistenceAdapter();

  const article = await adapter.getBySlug({
    category: 'DAILY_ARTICLE',
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
      basePath="daily"
    />
  );
};

export default DailyArticleEditPage;
