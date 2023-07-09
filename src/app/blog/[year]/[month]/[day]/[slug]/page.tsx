import React from 'react';
import { blogPersistenceAdapter } from '@/app/blog/adapter/blogPersistenceAdapter';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { formatDate } from '@/app/common/domain/model/formatDate';
import Link from 'next/link';
import MarkdownRenderer from '@/app/common/components/MarkdownRenderer';
import Comment from '@/app/common/components/Comment';

const BlogArticlePage = async (props: PageProps<{ slug: string }>): Promise<JSX.Element> => {
  const article = await blogPersistenceAdapter.getBySlug(props.params.slug);
  const commentIdentifier = `daily/${formatDate(article.created_at, '/')}/${article.slug}`;

  return (
    <main className={'w-full max-w-[800px]'}>
      <div className={'text-center'}>
        <Link href={''} className={'text-black'}>
          <h1 className={'m-4'}>{article.title}</h1>
        </Link>
        <p className={'cursor-default select-none'}>{formatDate(article.created_at)}</p>
      </div>
      <div className={'m-4'}>
        <MarkdownRenderer className={'leading-[1.8]'} markdown={article.content} />
        <Comment identifier={commentIdentifier} />
      </div>
    </main>
  );
};

export default BlogArticlePage;
