import React from 'react';
import BlogArticleFormContainer from '@/app/blog/containers/BlogArticleFormContainer';

export const fetchCache = 'force-no-store';

const BlogArticleEditPage = async () => {
  return (
    <BlogArticleFormContainer
      createOrEdit={'create'}
      seq={''}
      slug={''}
      title={''}
      content={''}
      published_at={null}
    />
  );
};

export default BlogArticleEditPage;
