import React from 'react';
import { blogPersistenceAdapter } from '@/app/blog/adapter/blogPersistenceAdapter';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { formatDate } from '@/app/common/domain/model/formatDate';
import Link from 'next/link';
import MarkdownRenderer from '@/app/common/components/MarkdownRenderer';
import Comment from '@/app/common/components/Comment';
import { toSlug } from '@/app/common/domain/model/toSlug';
import { Metadata } from 'next';
import { createTitle } from '@/app/common/domain/model/constants';

type Props = PageProps<{ slug: string }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await blogPersistenceAdapter.getBySlug(params.slug);

  return {
    title: createTitle(article.title),
    description: article.content.substring(0, 512),
  };
}

const BlogArticlePage = async (props: Props): Promise<JSX.Element> => {
  const article = await blogPersistenceAdapter.getBySlug(props.params.slug);
  const [prev, next] = await Promise.all(
    [blogPersistenceAdapter.getPrevOf, blogPersistenceAdapter.getNextOf].map((f) => f(article.seq)),
  );
  const commentIdentifier = `blog/${formatDate(article.created_at, '/')}/${article.slug}`;

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
        <div className={'text-sm'}>
          <hr />
          <div className={'my-4 flex flex-col gap-1.5 text-center'}>
            {!!next.id && (
              <>
                <div>Next Article</div>
                <Link href={`/blog/${toSlug(next)}`}>{next.title}</Link>
              </>
            )}
            {!!prev.id && (
              <>
                <div className={'mt-2'}>Previous Article</div>
                <Link href={`/blog/${toSlug(prev)}`}>{prev.title}</Link>
              </>
            )}
          </div>
          <hr />
          <div className={'my-4 flex justify-center'}>
            <Link href={'/blog'}>
              <button
                type="button"
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Article List
              </button>
            </Link>
          </div>
        </div>

        <Comment identifier={commentIdentifier} />
      </div>
    </main>
  );
};

export default BlogArticlePage;
