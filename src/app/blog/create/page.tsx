import React from 'react';
import BlogArticleFormContainer from '@/app/blog/containers/BlogArticleFormContainer';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';

export const fetchCache = 'force-no-store';

const BlogArticleCreatePage = async () => {
  const adapter = createArticlePersistenceAdapter();

  const nextSeq = await adapter.getNextSeq({ category: 'BLOG_ARTICLE' });

  return (
    <BlogArticleFormContainer
      createOrEdit={'create'}
      seq={nextSeq + ''}
      slug={''}
      title={''}
      content={''}
      published_at={null}
    />
  );
};

export default BlogArticleCreatePage;
