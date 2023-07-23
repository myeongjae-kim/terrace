import React from 'react';
import { PageProps } from '@/app/common/nextjs/PageProps';
import { formatDate } from '@/app/common/domain/model/formatDate';
import Link from 'next/link';
import Comment from '@/app/common/components/Comment';
import { toSlug } from '@/app/common/domain/model/toSlug';
import { Metadata } from 'next';
import { constants } from '@/app/common/domain/model/constants';
import { createMetadata } from '@/app/common/domain/model/createMetadata';
import MarkdownRendererContainer from '@/app/common/containers/MarkdownRendererContainer';
import { createArticlePersistenceAdapter } from '@/app/common/adapter/createArticlePersistenceAdapter';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { cookies } from 'next/headers';
import { addSeqToTitle, addWipEmojiToTitle } from '@/app/common/domain/model/Article';
import clsx from 'clsx';
import Button from '@/app/common/components/Button';
import { match } from 'ts-pattern';

type Props = PageProps<{ slug: string }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createArticlePersistenceAdapter(
    createServerComponentClient<Database>({ cookies }),
  );

  const article = await supabase.getBySlug({
    category: 'BLOG_ARTICLE',
    slug: params.slug,
  });

  return createMetadata({
    title: constants.createTitle(article.title),
    description: article.content.substring(0, 512),
  });
}

const BlogArticlePage = async (props: Props): Promise<JSX.Element> => {
  const supabase = createArticlePersistenceAdapter(
    createServerComponentClient<Database>({ cookies }),
  );
  const article = await supabase.getBySlug({
    category: 'BLOG_ARTICLE',
    slug: props.params.slug,
  });
  const [prev, next] = await Promise.all(
    [supabase.getPrevOf, supabase.getNextOf].map((f) =>
      f({ category: 'BLOG_ARTICLE', seq: article.seq }),
    ),
  );
  const commentIdentifier = `blog/${formatDate(article.created_at, '/')}/${article.slug}`;

  const isOwner = await supabase.isOwner();

  return (
    <main className={'w-full max-w-[50rem]'}>
      <div className={'text-center'}>
        <Link href={'#'} className={'text-black'}>
          <h1 className={clsx('m-4', article.published_at || 'opacity-50')}>
            {match(isOwner)
              .with(true, () => addWipEmojiToTitle(addSeqToTitle(article)).title)
              .with(false, () => article.title)
              .exhaustive()}
          </h1>
        </Link>
        <p className={'cursor-default select-none'}>{formatDate(article.created_at)}</p>
        {isOwner && (
          <Link href={`./${article.slug}/edit`}>
            <Button>수정</Button>
          </Link>
        )}
      </div>
      <div className={'m-4'}>
        <MarkdownRendererContainer
          className={'mb-4 leading-[1.8]'}
          markdown={article.content}
          enableToc
        />
        <div className={'text-sm'}>
          <hr />
          <div className={'my-4 flex flex-col gap-1.5 text-center'}>
            {!!next.id && (
              <>
                <div className={'select-none'}>Next Article</div>
                <Link href={`/blog/${toSlug(next)}`}>{next.title}</Link>
              </>
            )}
            {!!prev.id && (
              <>
                <div className={'select-none'}>Previous Article</div>
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
