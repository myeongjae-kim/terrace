import React from 'react';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { articlePersistenceAdapter } from '@/app/common/adapter/articlePersistenceAdapter';
import BlogArticleEditorContainer from './containers/BlogArticleEditorContainer';

type Props = PageProps<{ slug: string }>;

const BlogArticleEditPage = async ({ params }: Props) => {
  const article = await articlePersistenceAdapter.getBySlug({
    category: 'BLOG_ARTICLE',
    slug: params.slug,
  });
  return <BlogArticleEditorContainer content={article.content} />;
};

export default BlogArticleEditPage;
