import React from 'react';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { articlePersistenceAdapter } from '@/app/common/adapter/articlePersistenceAdapter';
import BlogArticleFormContainer from './containers/BlogArticleFormContainer';

type Props = PageProps<{ slug: string }>;

const BlogArticleEditPage = async ({ params }: Props) => {
  const article = await articlePersistenceAdapter.getBySlug({
    category: 'BLOG_ARTICLE',
    slug: params.slug,
  });
  return (
    <BlogArticleFormContainer
      seq={article.seq + ''}
      slug={article.slug}
      title={article.title}
      content={article.content}
    />
  );
};

export default BlogArticleEditPage;
